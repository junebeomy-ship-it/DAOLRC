"use client";

import { useActionState, useEffect, useRef } from "react";
import { createPost } from "@/app/actions";
import { getFieldSet } from "@/lib/categories";

export default function PostForm({ category }: { category: string }) {
  const [state, formAction, pending] = useActionState(createPost, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const isNdr = getFieldSet(category) === "ndr";

  useEffect(() => {
    if (state === undefined) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4"
    >
      <input type="hidden" name="category" value={category} />
      <div className="flex flex-col gap-1">
        <label htmlFor="occurred_at" className="text-sm font-medium text-neutral-700">
          일시
        </label>
        <input
          id="occurred_at"
          name="occurred_at"
          type="datetime-local"
          required
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="analyst" className="text-sm font-medium text-neutral-700">
          애널리스트
        </label>
        <input
          id="analyst"
          name="analyst"
          required
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
        />
      </div>
      {isNdr ? (
        <>
          <div className="flex flex-col gap-1">
            <label htmlFor="institution" className="text-sm font-medium text-neutral-700">
              기관
            </label>
            <input
              id="institution"
              name="institution"
              required
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="company" className="text-sm font-medium text-neutral-700">
              기업
            </label>
            <input
              id="company"
              name="company"
              required
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-1">
          <label htmlFor="target" className="text-sm font-medium text-neutral-700">
            대상자
          </label>
          <input
            id="target"
            name="target"
            required
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
      )}
      {state?.error && (
        <p className="text-sm text-red-600" aria-live="polite">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "등록 중..." : "등록"}
      </button>
    </form>
  );
}
