/**
 * Frontend API wrapper for communicating with the backend Gemini server
 * This keeps all API logic in one place
 */

export async function sendGemini(messages) {
  console.log("🚀 Sending request to backend:", messages);
  
  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  console.log("📡 Response status:", res.status, res.statusText);

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    console.error("❌ Error from backend:", data);
    
    // Show user-friendly error messages
    if (res.status === 429) {
      throw new Error("Rate limit exceeded. Please wait a minute or enable billing on your API key.");
    }
    
    throw new Error(data.message || data.error || "Gemini request failed");
  }

  const result = await res.json();
  console.log("✅ Success! Reply:", result.reply);
  return result; // Returns { reply: "..." }
}
