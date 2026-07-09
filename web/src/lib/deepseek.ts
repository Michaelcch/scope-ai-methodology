import { createOpenAI } from "@ai-sdk/openai";

// DeepSeek API 兼容 OpenAI 协议
export const deepseek = createOpenAI({
  baseURL: "https://api.deepseek.com/v1",
  apiKey: process.env.DEEPSEEK_API_KEY!,
});

export const DEEPSEEK_MODEL = "deepseek-chat";
