"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* AI 头像 */}
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
          AI
        </div>
      )}

      {/* 消息气泡 */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-sm prose-zinc max-w-none dark:prose-invert
            prose-headings:mt-4 prose-headings:mb-2 prose-headings:font-semibold
            prose-h2:text-base prose-h3:text-sm
            prose-p:my-2 prose-p:leading-relaxed
            prose-ul:my-2 prose-li:my-0.5
            prose-table:text-xs prose-table:overflow-x-auto
            prose-th:px-2 prose-th:py-1.5 prose-th:bg-zinc-200 dark:prose-th:bg-zinc-700
            prose-td:px-2 prose-td:py-1
            prose-code:bg-zinc-200 dark:prose-code:bg-zinc-700 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
            prose-blockquote:border-l-2 prose-blockquote:border-blue-400 prose-blockquote:pl-3 prose-blockquote:text-zinc-600 dark:prose-blockquote:text-zinc-400
            prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* 用户头像 */}
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-300 text-xs font-medium text-zinc-700 dark:bg-zinc-600 dark:text-zinc-200">
          我
        </div>
      )}
    </div>
  );
}
