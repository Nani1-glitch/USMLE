import OpenAI from "openai";
import { env } from "@/lib/env";

export const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export const defaultChatModel = env.OPENAI_MODEL;
export const defaultEmbeddingModel = env.EMBEDDING_MODEL;
