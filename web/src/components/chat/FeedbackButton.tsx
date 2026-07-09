"use client";

import { useState } from "react";

export function FeedbackButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 悬浮按钮 */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs text-zinc-500 shadow-lg transition-all hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        意见反馈
      </button>

      {/* 弹窗 */}
      {open && <FeedbackModal onClose={() => setOpen(false)} />}
    </>
  );
}

// ============================================================
// FeedbackModal
// ============================================================

function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState<string>("suggestion");
  const [content, setContent] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          content: content.trim(),
          contact: contact.trim() || undefined,
          page: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setTimeout(onClose, 2000);
    } catch {
      setStatus("error");
      setErrorMsg("提交失败，请稍后重试");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          意见反馈
        </h2>

        {status === "success" ? (
          <div className="py-8 text-center">
            <div className="mb-2 text-3xl">🎉</div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              感谢您的反馈！
            </p>
          </div>
        ) : (
          <>
            {/* 类型选择 */}
            <div className="mb-4 flex gap-2">
              {[
                { value: "suggestion", label: "💡 建议" },
                { value: "bug", label: "🐛 问题" },
                { value: "other", label: "💬 其他" },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setType(value)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    type === value
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* 内容 */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请描述您的想法或遇到的问题…"
              rows={4}
              maxLength={5000}
              className="mb-3 w-full resize-none rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />

            {/* 联系方式（可选） */}
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="联系方式（选填，方便我们回复您）"
              maxLength={200}
              className="mb-4 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />

            {/* 错误提示 */}
            {status === "error" && (
              <p className="mb-3 text-xs text-red-500">{errorMsg}</p>
            )}

            {/* 按钮 */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400"
              >
                取消
              </button>
              <button
                onClick={handleSubmit}
                disabled={!content.trim() || status === "submitting"}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "submitting" ? "提交中…" : "提交反馈"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
