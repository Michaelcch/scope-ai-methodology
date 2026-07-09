import { getAuthFromCookies } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { FeedbackCard } from "@/components/admin/FeedbackCard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // 鉴权
  const authed = await getAuthFromCookies();
  if (!authed) {
    redirect("/admin");
  }

  // 查询反馈
  let feedbacks: Array<{
    id: string;
    type: string;
    content: string;
    contact: string | null;
    page: string | null;
    createdAt: Date;
    read: boolean;
  }> = [];

  try {
    feedbacks = await db.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB 未连接时显示空列表
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* 顶部栏 */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              反馈管理
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              共 {feedbacks.length} 条反馈
            </p>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="rounded-lg px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              登出
            </button>
          </form>
        </div>
      </header>

      {/* 反馈列表 */}
      <main className="mx-auto max-w-3xl px-4 py-6">
        {feedbacks.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-4xl">📭</p>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              暂无反馈
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {feedbacks.map((fb) => (
              <FeedbackCard
                key={fb.id}
                feedback={{
                  ...fb,
                  createdAt: fb.createdAt.toISOString(),
                }}
              />
            ))}
          </div>
        )}

        {/* 刷新 */}
        <div className="mt-6 text-center">
          <a
            href="/admin/dashboard"
            className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            刷新页面
          </a>
        </div>
      </main>
    </div>
  );
}
