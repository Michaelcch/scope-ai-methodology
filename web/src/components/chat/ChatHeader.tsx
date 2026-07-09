"use client";

import Link from "next/link";

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            SCOPE · AI 业务场景顾问
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            系统性地找到 AI 赋能业务的切入点
          </p>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="https://github.com/Michaelcch/scope-ai-methodology"
            target="_blank"
            className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            关于 SCOPE
          </Link>
          <Link
            href="/admin"
            className="text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
          >
            管理
          </Link>
        </nav>
      </div>
    </header>
  );
}
