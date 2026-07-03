import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-xl font-semibold text-neutral-900">
          팀 업무 보드 회원가입
        </h1>
        <SignupForm />
      </div>
    </main>
  );
}
