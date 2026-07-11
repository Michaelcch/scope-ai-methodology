"use client";

import { useState } from "react";
import type { UIMessage } from "ai";

function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((p) => p.type === "text")
    .map((p) => (p as { text: string }).text)
    .join("");
}

interface SaveSceneButtonProps {
  messages: UIMessage[];
  status: string;
}

export function SaveSceneButton({ messages, status }: SaveSceneButtonProps) {
  const [saveState, setSaveState] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isReady = status === "ready";
  const hasMessages = messages.length > 0;

  // 只在对话完成且有消息时显示
  if (!hasMessages || !isReady) return null;

  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  const lastAssistantMsg = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");

  if (!lastUserMsg || !lastAssistantMsg) return null;

  const handleSave = async () => {
    setSaveState("saving");
    try {
      const prompt = getMessageText(lastUserMsg);
      const result = getMessageText(lastAssistantMsg);

      const res = await fetch("/api/scenes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, result }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setSaveState("success");
      setTimeout(() => setSaveState("idle"), 3000);
    } catch (e) {
      console.error("保存方案失败:", e);
      setErrorMsg(e instanceof Error ? e.message : "未知错误");
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 5000);
    }
  };

  return (
    <>
      <button
        onClick={handleSave}
        disabled={saveState === "saving" || saveState === "success"}
        className="fixed bottom-24 right-36 z-40 flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs text-zinc-500 shadow-lg transition-all hover:border-zinc-300 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-70 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        {saveState === "saving" ? (
          <>
            <svg
              className="animate-spin"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            保存中…
          </>
        ) : saveState === "success" ? (
          <>
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
              <polyline points="20 6 9 17 4 12" />
            </svg>
            已保存
          </>
        ) : saveState === "error" ? (
          <>
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
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            保存失败
          </>
        ) : (
          <>
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
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            保存方案
          </>
        )}
      </button>

      {/* Toast */}
      {saveState === "success" && (
        <div className="fixed bottom-36 right-36 z-40 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700 shadow-sm dark:border-green-800 dark:bg-green-950 dark:text-green-300">
          方案已保存成功！
        </div>
      )}
      {saveState === "error" && (
        <div className="fixed bottom-36 right-36 z-40 max-w-xs rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 shadow-sm dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {errorMsg || "保存失败，请稍后重试"}
        </div>
      )}
    </>
  );
}
