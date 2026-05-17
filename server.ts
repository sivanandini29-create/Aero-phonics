import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes go here
  app.get("/api/health", (req, res) => {
    console.log("[SERVER] API request: /api/health");
    res.json({ 
      status: "system_online",
      node: "KYOTO_01_REVISED",
      latency: "0.001ms",
      timestamp: new Date().toISOString()
    });
  });

  // Gemini Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...(history || []), { role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: `You are the AERO-PHONICS System AI, a technical assistant for a high-fidelity industrial audio interface company. 
          Your tone is efficient, slightly futuristic, and helpful. 
          You assist with catalog inquiries, node status, and technical specifications of audio modules.
          Keep responses concise and formatted in markdown.
          CRITICAL INSTRUCTION: Reply exactly and ONLY to what the user asks. Do not provide unsolicited information, additional features, or conversational filler. Do NEVER ask follow-up questions like "Would you like to...". Provide ONLY the direct answer.`,
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("[GEMINI ERROR]", error);
      res.status(500).json({ error: "Failed to establish neural uplink with AI core." });
    }
  });

  // Example product data API
  app.get("/api/products", (req, res) => {
    console.log("[SERVER] API request: /api/products");
    // In a real app, this would come from a database
    res.json([
      { id: "1", name: "AP-700 X-TRANS", price: 499, status: "stable" },
      { id: "2", name: "CORE-NODE-9", price: 850, status: "optimized" },
    ]);
  });

  app.get("/api/node-status", (req, res) => {
    console.log("[SERVER] API request: /api/node-status");
    const statuses = ["ONLINE", "OFFLINE", "MAINTENANCE"];
    // Return random status for demonstration if needed, or just ONLINE
    res.json({ status: "ONLINE" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYSTEM] Server initialized on http://localhost:${PORT}`);
  });
}

startServer();
