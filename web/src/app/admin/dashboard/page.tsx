import { getAuthFromCookies } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DashboardTabs } from "@/components/admin/DashboardTabs";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const authed = await getAuthFromCookies();
  if (!authed) redirect("/admin");

  let feedbacks: Array<{
    id: string;
    type: string;
    content: string;
    contact: string | null;
    page: string | null;
    createdAt: Date;
    read: boolean;
  }> = [];

  let scenes: Array<{
    id: string;
    prompt: string;
    result: string;
    createdAt: Date;
  }> = [];

  try {
    [feedbacks, scenes] = await Promise.all([
      db.feedback.findMany({ orderBy: { createdAt: "desc" } }),
      db.scene.findMany({ orderBy: { createdAt: "desc" } }),
    ]);
  } catch {
    // DB 未连接时显示空列表
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <DashboardTabs
        feedbacks={feedbacks.map((fb) => ({
          ...fb,
          createdAt: fb.createdAt.toISOString(),
        }))}
        scenes={scenes.map((s) => ({
          ...s,
          createdAt: s.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
