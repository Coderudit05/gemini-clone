import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();  // Load from server/.env

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Try gemini-1.5-pro or fallback to gemini-2.0-flash-exp
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const history = messages.slice(0, -1).map(m => ({
      role: m.role === "model" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "user") {
      return res.status(400).json({ error: "Last message must be from user" });
    }

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Handle rate limit errors
    if (error.message && error.message.includes("429")) {
      return res.status(429).json({ 
        error: "Rate limit exceeded", 
        details: "You've exceeded your free tier quota. Please wait a minute or upgrade your plan.",
        message: "Quota exceeded - please wait or upgrade to a paid plan"
      });
    }
    
    // Handle model not found errors
    if (error.message && error.message.includes("404")) {
      return res.status(500).json({ 
        error: "Model not available", 
        details: "The Gemini model is not available. Try again later or check your API key.",
        message: "Model unavailable - please contact support"
      });
    }
    
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});