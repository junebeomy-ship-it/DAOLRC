"use client";

import { logout } from "@/app/actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="text-sm text-neutral-500 underline hover:text-neutral-900">
        로그아웃
      </button>
    </form>
  );
}
