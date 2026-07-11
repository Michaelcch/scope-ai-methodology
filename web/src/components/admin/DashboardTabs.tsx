"use client";

import { useState } from "react";
import { FeedbackCard } from "@/components/admin/FeedbackCard";
import { SceneCard } from "@/components/admin/SceneCard";

interface FeedbackItem {
  id: string;
  type: string;
  content: string;
  contact: string | null;
  page: string | null;
  createdAt: string;
  read: boolean;
}

interface SceneItem {
  id: string;
  prompt: string;
  result: string;
  createdAt: string;
}

interface DashboardTabsProps {
  feedbacks: FeedbackItem[];
  scenes: SceneItem[];
}

type Tab = "feedback" | "scenes";

export function DashboardTabs({ feedbacks, scenes }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("feedback");

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              管理后台
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {activeTab === "feedback"
                ? `共 ${feedbacks.length} 条反馈`
                : `共 ${scenes.length} 个方案`}
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

        {/* 标签栏 */}
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex gap-0">
            {[
              { key: "feedback" as Tab, label: "反馈管理" },
              { key: "scenes" as Tab, label: "方案管理" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === key
                    ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-b-2 border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        {activeTab === "feedback" && (
          <>
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
                  <FeedbackCard key={fb.id} feedback={fb} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "scenes" && (
          <>
            {scenes.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-4xl">📋</p>
                <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                  暂无保存的方案
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {scenes.map((scene) => (
                  <SceneCard key={scene.id} scene={scene} />
                ))}
              </div>
            )}
          </>
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
    </>
  );
}
