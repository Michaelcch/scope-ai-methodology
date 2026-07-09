"use client";

interface FeedbackItem {
  id: string;
  type: string;
  content: string;
  contact: string | null;
  page: string | null;
  createdAt: string;
  read: boolean;
}

interface FeedbackCardProps {
  feedback: FeedbackItem;
}

const TYPE_LABELS: Record<string, string> = {
  suggestion: "💡 建议",
  bug: "🐛 问题",
  other: "💬 其他",
};

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  const date = new Date(feedback.createdAt);
  const dateStr = date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {TYPE_LABELS[feedback.type] || feedback.type}
        </span>
        {feedback.read ? (
          <span className="text-xs text-zinc-400">已读</span>
        ) : (
          <span className="text-xs text-blue-500">新</span>
        )}
        <span className="ml-auto text-xs text-zinc-400">{dateStr}</span>
      </div>

      <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {feedback.content}
      </p>

      {(feedback.contact || feedback.page) && (
        <div className="mt-3 border-t border-zinc-100 pt-2 text-xs text-zinc-400 dark:border-zinc-800">
          {feedback.contact && <p>联系方式: {feedback.contact}</p>}
          {feedback.page && <p>来源: {feedback.page}</p>}
        </div>
      )}
    </div>
  );
}
