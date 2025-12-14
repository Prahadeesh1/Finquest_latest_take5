import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Initialize AI Studio client
const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY // Your AI Studio key
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend running with AI Studio key" });
});

app.post("/api/gemini", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ candidates: [{ content: "Prompt cannot be empty." }] });
  }

  try {
    console.log("📤 Sending prompt to AI Studio...");

    const response = await client.responses.create({
      model: "gemini-2.5", // Stable model for AI Studio
      input: prompt
    });

    // The text is usually in response.output_text
    const aiText = response.output_text || "No response from Gemini";

    console.log("🤖 AI Response:", aiText);

    res.json({ candidates: [{ content: aiText }] });
  } catch (err) {
    console.error("❌ AI Studio error:", err);
    res.status(500).json({ candidates: [{ content: "Server error: " + err.message }] });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
