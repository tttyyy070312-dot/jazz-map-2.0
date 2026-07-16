import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent crash on startup if API key is not yet configured.
let aiInstance: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error(
      "GEMINI_API_KEY is not configured or holds a placeholder. Please set your real API Key in the Secrets panel in the Google AI Studio UI."
    );
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// 1. Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    apiKeyConfigured: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"
  });
});

// 2. AI Jazz Tour Guide conversational endpoint
app.post("/api/jazz-guide", async (req, res) => {
  try {
    const { message, history, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getAI();
    
    // Construct system instructions to ensure the AI remains a highly knowledgeable,
    // sophisticated, and immersive musicologist and digital humanities jazz expert.
    const systemInstruction = `You are the resident AI Jazz Guide (爵士导览员) for Jazz Atlas, a sophisticated Digital Humanities and Music History Visualization platform. 
Your tone is elegant, intellectual, passionate about music, yet welcoming and conversational.
You speak primarily in Chinese (简体中文) as requested, but you can seamlessly incorporate terms, song titles, artist names, and places in English (e.g. "Louis Armstrong", "Bebop", "Village Vanguard", "Kind of Blue") to maintain academic and historical accuracy.

Current Context:
The user is exploring the Jazz Atlas interface. They can view cities, musicians, historic jazz clubs, and genres on a timeline from 1890s to 2020s.
Current city/artist/club/genre being viewed: ${JSON.stringify(context || "None")}

Guidelines:
1. Provide rich, historically accurate details about jazz movements, geographical migration (such as the Great Migration from New Orleans to Chicago and Harlem), key musical characteristics, and records.
2. Structure your response with clean Markdown. Do NOT use flowery self-praising words, but describe styles vividly (e.g. describe the smoky atmosphere of a 52nd Street club or the modal freedom of Miles Davis).
3. Always suggest specific recordings, tracks, or listening recommendations to enrich their sound map experience.
4. Keep answers concise, highly readable, and structured. Max 250-300 words unless they ask for a comprehensive custom itinerary (in which case you can provide a detailed 'Jazz Road Trip' sequence).
5. Avoid technical developer jargon. Focus purely on musicology, history, and spatial culture.`;

    // Map conversation history into the format expected by the @google/genai SDK chats or content stream
    // Using simple generateContent with a compiled prompt list is reliable and safe
    const promptContents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((turn: any) => {
        promptContents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.content }]
        });
      });
    }
    
    // Add the current user query
    promptContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text;
    res.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error in /api/jazz-guide:", error);
    res.status(500).json({ 
      error: error.message || "An error occurred while connecting to the Gemini AI server." 
    });
  }
});

// Setup Vite Dev server or production static hosting
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite dev server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Setting up production static file serving...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Jazz Atlas Server running on http://localhost:${PORT}`);
  });
}

initServer();
