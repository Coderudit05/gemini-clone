import { useState, useCallback } from "react";
import { sendGemini } from "../services/geminiApi";

/**
 * Custom hook to manage Gemini chat state
 * Handles messages array, loading state, errors, and sending messages
 * 
 * Usage:
 * const { messages, loading, error, send } = useGeminiChat();
 * 
 * messages: Array of { role: "user" | "model", content: string }
 * loading: Boolean indicating if a request is in progress
 * error: String with error message (null if no error)
 * send: Function to send a user message (async)
 */
export function useGeminiChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const send = useCallback(
    async (text) => {
      // Don't send empty messages or if already loading
      if (!text.trim() || loading) return;

      // Add user message to state
      const next = [...messages, { role: "user", content: text }];
      setMessages(next);
      setLoading(true);
      setError(null);

      try {
        // Call backend API
        const { reply } = await sendGemini(next);
        
        // Add model reply to state
        setMessages((m) => [...m, { role: "model", content: reply }]);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  return { messages, loading, error, send };
}
