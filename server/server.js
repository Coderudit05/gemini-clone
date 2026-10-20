import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY must be set in the server environment.");
}

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: "1mb" }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body ?? {};

    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 50) {
      return res.status(400).json({
        error: "Messages must be a non-empty array containing at most 50 items.",
      });
    }

    const invalidMessage = messages.some(
      (message) =>
        !message ||
        !["user", "model"].includes(message.role) ||
        typeof message.content !== "string" ||
        message.content.trim().length === 0 ||
        message.content.length > 8000
    );

    if (invalidMessage) {
      return res.status(400).json({
        error: "Each message must have a valid role and text of 1 to 8000 characters.",
      });
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "user") {
      return res.status(400).json({ error: "Last message must be from user." });
    }

    const history = messages.slice(0, -1).map((message) => ({
      role: message.role,
      parts: [{ text: message.content }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);

    return res.json({ reply: result.response.text() });
  } catch (error) {
    console.error("Gemini API request failed:", error);

    if (String(error?.status ?? error?.message).includes("429")) {
      return res.status(429).json({ error: "AI service rate limit reached. Please try again later." });
    }

    if (String(error?.status ?? error?.message).includes("404")) {
      return res.status(502).json({ error: "The configured AI model is unavailable." });
    }

    return res.status(500).json({ error: "Unable to process the request right now." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
