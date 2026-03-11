import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  // API routes
  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: message,
        config: {
          systemInstruction: "You are SafeTravel AI, a smart travel safety assistant. Provide concise, practical travel safety advice. If the user is in an emergency, advise them to contact local authorities immediately. Keep responses helpful and reassuring.",
        }
      });
      
      const response = await model;
      res.json({ reply: response.text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ reply: "I'm sorry, I'm having trouble connecting to my safety database. Please stay alert and follow local safety guidelines." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
