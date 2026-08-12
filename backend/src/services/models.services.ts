import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import config from "../config/config.js";

export const gemini_model = new ChatGoogle({
  apiKey: config.GEMINI_API_KEY,
  model: "gemini-2.5-flash",
});

export const mistral_model = new ChatMistralAI({
  apiKey: config.MISTRAL_API_KEY,
  model: "mistral-small-2603",
  temperature: 0,
  maxRetries: 2,
});

export const cohere_model = new ChatCohere({
  apiKey: config.COHERE_API_KEY,
  model: "command-a-03-2025",
  temperature: 0,
  maxRetries: 2,
});
