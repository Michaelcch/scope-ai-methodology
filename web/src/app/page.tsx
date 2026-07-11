"use client";

import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessageList } from "@/components/chat/ChatMessageList";
import { ChatInput } from "@/components/chat/ChatInput";
import { WelcomePanel } from "@/components/chat/WelcomePanel";
import { FeedbackButton } from "@/components/chat/FeedbackButton";
import { SaveSceneButton } from "@/components/chat/SaveSceneButton";
import { useCallback, useMemo } from "react";

function generateToken(): string {
  return btoa(Date.now().toString());
}

export default function ChatPage() {
  const token = useMemo(() => generateToken(), []);

  const { messages, sendMessage, status, stop } = useChat({
    transport: new TextStreamChatTransport({
      api: "/api/chat",
      headers: { "x-scope-token": token },
    }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  const handleSend = useCallback(
    (msg: string) => {
      sendMessage({ text: msg });
    },
    [sendMessage]
  );

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-zinc-950">
      <ChatHeader />

      {hasMessages ? (
        <ChatMessageList messages={messages} isLoading={isLoading} />
      ) : (
        <WelcomePanel onExampleClick={handleSend} />
      )}

      <ChatInput onSubmit={handleSend} onStop={stop} isLoading={isLoading} />

      <SaveSceneButton messages={messages} status={status} />
      <FeedbackButton />
    </div>
  );
}
