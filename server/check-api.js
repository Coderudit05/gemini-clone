import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

console.log("=".repeat(60));
console.log("GEMINI API KEY CHECKER");
console.log("=".repeat(60));

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.log("❌ No API key found in .env file");
  process.exit(1);
}

console.log("✅ API Key found:", apiKey.substring(0, 10) + "..." + apiKey.substring(apiKey.length - 4));
console.log("\n" + "=".repeat(60));
console.log("TESTING API CONNECTION");
console.log("=".repeat(60));

const genAI = new GoogleGenerativeAI(apiKey);

// Test with the experimental model
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

console.log("\nSending test request (this counts against your quota)...");
console.log("Model: gemini-2.0-flash-exp");

try {
  const startTime = Date.now();
  const result = await model.generateContent("Hi");
  const endTime = Date.now();
  
  const text = result.response.text();
  
  console.log("\n✅ SUCCESS!");
  console.log("Response time:", (endTime - startTime) + "ms");
  console.log("Response:", text);
  console.log("\n" + "=".repeat(60));
  console.log("STATUS: Your API is working! 🎉");
  console.log("=".repeat(60));
  
} catch (error) {
  console.log("\n❌ ERROR!");
  console.log("=".repeat(60));
  
  if (error.message.includes("429")) {
    console.log("🚫 RATE LIMIT EXCEEDED");
    console.log("=".repeat(60));
    console.log("\nYour API key has hit the rate limit.");
    console.log("\nFree Tier Limits:");
    console.log("  • 15 requests per minute");
    console.log("  • 1,500 requests per day (with billing enabled)");
    console.log("\nWhat to do:");
    console.log("  1. Wait 1-2 minutes and try again");
    console.log("  2. Enable billing at: https://console.cloud.google.com/billing");
    console.log("  3. Check usage at: https://aistudio.google.com/app/apikey");
    console.log("\n" + "=".repeat(60));
  } else if (error.message.includes("404")) {
    console.log("🚫 MODEL NOT FOUND");
    console.log("=".repeat(60));
    console.log("\nThe model 'gemini-2.0-flash-exp' is not available.");
    console.log("This might be because:");
    console.log("  • It's an experimental model that expired");
    console.log("  • Your API key doesn't have access");
    console.log("  • It's been deprecated");
    console.log("\n" + "=".repeat(60));
  } else if (error.message.includes("401") || error.message.includes("403")) {
    console.log("🚫 AUTHENTICATION ERROR");
    console.log("=".repeat(60));
    console.log("\nYour API key is invalid or expired.");
    console.log("\nWhat to do:");
    console.log("  1. Generate a new key at: https://aistudio.google.com/apikey");
    console.log("  2. Update your .env file");
    console.log("  3. Restart the server");
    console.log("\n" + "=".repeat(60));
  } else {
    console.log("UNKNOWN ERROR");
    console.log("=".repeat(60));
    console.log("\nError message:", error.message);
    console.log("\n" + "=".repeat(60));
  }
}

console.log("\nTo check your quota and usage:");
console.log("👉 Visit: https://aistudio.google.com/app/apikey");
console.log("\n");
