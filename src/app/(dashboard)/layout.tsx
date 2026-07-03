import { requireSession } from "@/lib/auth";
import TabNav from "@/components/TabNav";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold text-neutral-900">팀 업무 보드</h1>
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <span>{session.name}님</span>
            <LogoutButton />
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-4">
          <TabNav />
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
