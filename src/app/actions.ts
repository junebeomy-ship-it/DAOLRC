"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createSession, destroySession, getSession } from "@/lib/auth";
import { getFieldSet, isValidCategory } from "@/lib/categories";

export type FormState = { error?: string } | undefined;

export async function signup(_prevState: FormState, formData: FormData): Promise<FormState> {
  const username = String(formData.get("username") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !name || !password) {
    return { error: "아이디, 이름, 비밀번호를 모두 입력해 주세요." };
  }
  if (password.length < 4) {
    return { error: "비밀번호는 4자 이상이어야 합니다." };
  }

  const { data: existing } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  if (existing) {
    return { error: "이미 사용 중인 아이디입니다." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { data: user, error } = await supabaseAdmin
    .from("users")
    .insert({ username, name, password_hash: passwordHash })
    .select("id, username, name")
    .single();

  if (error || !user) {
    return { error: "회원가입 중 오류가 발생했습니다. 다시 시도해 주세요." };
  }

  await createSession({ userId: user.id, username: user.username, name: user.name });
  redirect("/seminar");
}

export async function login(_prevState: FormState, formData: FormData): Promise<FormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "아이디와 비밀번호를 입력해 주세요." };
  }

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("id, username, name, password_hash")
    .eq("username", username)
    .maybeSingle();

  if (!user) {
    return { error: "아이디 또는 비밀번호가 올바르지 않습니다." };
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return { error: "아이디 또는 비밀번호가 올바르지 않습니다." };
  }

  await createSession({ userId: user.id, username: user.username, name: user.name });
  redirect("/seminar");
}

export async function logout() {
  await destroySession();
  redirect("/login");
}

export async function createPost(_prevState: FormState, formData: FormData): Promise<FormState> {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const category = String(formData.get("category") ?? "");
  if (!isValidCategory(category)) {
    return { error: "잘못된 카테고리입니다." };
  }

  const occurredAtRaw = String(formData.get("occurred_at") ?? "").trim();
  const analyst = String(formData.get("analyst") ?? "").trim();

  if (!occurredAtRaw || !analyst) {
    return { error: "일시와 애널리스트를 입력해 주세요." };
  }

  const occurredAt = new Date(occurredAtRaw);
  if (Number.isNaN(occurredAt.getTime())) {
    return { error: "일시 형식이 올바르지 않습니다." };
  }

  const insertData: Record<string, unknown> = {
    category,
    occurred_at: occurredAt.toISOString(),
    analyst,
    author_id: session.userId,
    author_name: session.name,
  };

  if (getFieldSet(category) === "ndr") {
    const institution = String(formData.get("institution") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    if (!institution || !company) {
      return { error: "기관과 기업을 입력해 주세요." };
    }
    insertData.institution = institution;
    insertData.company = company;
  } else {
    const target = String(formData.get("target") ?? "").trim();
    if (!target) {
      return { error: "대상자를 입력해 주세요." };
    }
    insertData.target = target;
  }

  const { error } = await supabaseAdmin.from("posts").insert(insertData);

  if (error) {
    return { error: "저장 중 오류가 발생했습니다. 다시 시도해 주세요." };
  }

  revalidatePath(`/${category}`);
  return undefined;
}

export async function getPosts(category: string) {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("id, occurred_at, analyst, target, institution, company, author_name, created_at")
    .eq("category", category)
    .order("occurred_at", { ascending: false });

  if (error) {
    throw new Error("게시글을 불러오는 중 오류가 발생했습니다.");
  }

  return data ?? [];
}
