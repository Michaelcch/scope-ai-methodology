"use client";

interface SceneItem {
  id: string;
  prompt: string;
  result: string;
  createdAt: string;
}

interface SceneCardProps {
  scene: SceneItem;
}

export function SceneCard({ scene }: SceneCardProps) {
  const date = new Date(scene.createdAt);
  const dateStr = date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const truncatedPrompt =
    scene.prompt.length > 150
      ? scene.prompt.slice(0, 150) + "…"
      : scene.prompt;

  const truncatedResult =
    scene.result.length > 300
      ? scene.result.slice(0, 300) + "…"
      : scene.result;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
      {/* 头部：标签 + 时间 */}
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
          方案
        </span>
        <span className="ml-auto text-xs text-zinc-400">{dateStr}</span>
      </div>

      {/* 用户问题 */}
      <p className="mb-3 rounded-lg bg-zinc-50 px-3 py-2 text-xs italic text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
        {truncatedPrompt}
      </p>

      {/* AI 方案预览 */}
      <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p className="whitespace-pre-wrap">{truncatedResult}</p>
      </div>
    </div>
  );
}
