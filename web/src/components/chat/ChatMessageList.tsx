"use client";

import { useEffect, useRef } from "react";
import { ChatBubble } from "./ChatBubble";
import type { UIMessage } from "ai";

// 从 UIMessage.parts 提取纯文本
function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((p) => p.type === "text")
    .map((p) => (p as { text: string }).text)
    .join("");
}

interface ChatMessageListProps {
  messages: UIMessage[];
  isLoading: boolean;
}

export function ChatMessageList({
  messages,
  isLoading,
}: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {messages
          .filter((msg) => msg.role === "user" || msg.role === "assistant")
          .map((msg) => (
            <ChatBubble
              key={msg.id}
              role={msg.role as "user" | "assistant"}
              content={getMessageText(msg)}
            />
          ))}
        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
              AI
            </div>
            <div className="flex gap-1 px-4 py-3">
              <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:0ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
