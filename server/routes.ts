import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatRequestSchema, type ChatResponse } from "@shared/schema";
import { getOpenAIClient } from "./utils/openai";
import { getPineconeClient } from "./utils/pinecone";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat API route
  app.post("/api/chat", async (req, res) => {
    try {
      // Validate request body
      const { query } = chatRequestSchema.parse(req.body);
      
      const client = getOpenAIClient();
      const index = getPineconeClient();

      // 1. Embed query using text-embedding-3-small
      const embedding = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: [query],
      });

      const queryVector = embedding.data[0].embedding;

      // 2. Search Pinecone for relevant context
      const results = await index.query({
        vector: queryVector,
        topK: 5,
        includeMetadata: true,
      });

      // 3. Format context from search results
      const context = results.matches
        .map((m: any) => `Q: ${m.metadata?.question || 'Unknown'}\nA: ${m.metadata?.answer || 'No answer available'}`)
        .join("\n");

      // 4. Generate response using GPT-5
      // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      const completion = await client.chat.completions.create({
        model: "gpt-5",
        messages: [
          { 
            role: "system", 
            content: "You are a helpful AI assistant for Ritual AI. Answer based strictly on provided context. Provide step-by-step solutions when appropriate. Include exact commands/flags in fenced code blocks when relevant. If multiple options exist, list them by likelihood. If there's not enough evidence in the context, say so clearly." 
          },
          {
            role: "user",
            content: `User question: ${query}\n\nContext:\n${context}\n\nWrite a concise, step-by-step solution. Include exact commands/flags in fenced code blocks. If multiple options exist, list them by likelihood. If not enough evidence, say so.`,
          },
        ],
      });

      const response: ChatResponse = {
        answer: completion.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again."
      };

      res.json(response);
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ 
        error: "Failed to process chat request", 
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
