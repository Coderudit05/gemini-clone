import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

console.log("Testing Gemini API...");
console.log("API Key loaded:", process.env.GEMINI_API_KEY ? "Yes" : "No");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Test different model names
const modelNames = [
  "gemini-2.0-flash-exp",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-pro"
];

for (const modelName of modelNames) {
  try {
    console.log(`\nTrying model: ${modelName}`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Say 'Hello'");
    const text = result.response.text();
    console.log(`✅ Success with ${modelName}:`, text);
    break;
  } catch (error) {
    console.log(`❌ Failed with ${modelName}:`, error.message);
  }
}

console.log("\nTest complete!");
