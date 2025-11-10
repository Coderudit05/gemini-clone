import React from "react";
import { Mic, Send, Plus, Settings2, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useGeminiChat } from "../../../hooks/useGeminiChat";

// Dummy intent cards
const intentCards = [
  { label: "🍌 Create Image" },
  { label: "Write" },
  { label: "Build" },
  { label: "Deep Research" },
  { label: "Create video" },
  { label: "Learn" },
];

const ChatInterface = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const { messages, loading, error, send } = useGeminiChat();

  // Auto-resize logic
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto"; // reset height
    textarea.style.height = textarea.scrollHeight + "px"; // set new height
  }, [text]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || loading) return;
    send(text);
    setText("");
  };

  return (
    <div className="flex flex-col items-center justify-start gap-6 h-screen w-full bg-gray-900 text-gray-200 p-4 overflow-y-auto">
      {/* Greeting Section */}
      {messages.length === 0 && (
        <div className="mt-16 text-center">
          <h1
            className="mb-4 text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text animate-gradient"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #F858E0, #77156C, #6DEDD0, #7AE23A, #F858E0)",
              backgroundSize: "300% 100%",
            }}
          >
            Hello, Udit!
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            How can I help you today?
          </p>
        </div>
      )}

      {/* Messages Display */}
      {messages.length > 0 && (
        <div className="w-full max-w-3xl flex flex-col gap-3 mt-8">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`px-4 py-3 rounded-xl text-sm ${
                m.role === "user" ? "bg-gray-800 ml-auto max-w-[80%]" : "bg-gray-700 mr-auto max-w-[80%]"
              }`}
            >
              <div className="font-semibold mb-1 text-xs text-gray-400">
                {m.role === "user" ? "You" : "Gemini"}
              </div>
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="px-4 py-3 rounded-xl bg-gray-700 text-sm text-gray-300 mr-auto max-w-[80%]">
              <div className="font-semibold mb-1 text-xs text-gray-400">Gemini</div>
              <div>Thinking...</div>
            </div>
          )}
        </div>
      )}

      {/* Gemini Style Input Box */}
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mb-6 rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.2)] sticky bottom-4">
        <div className="flex flex-col bg-gray-900 rounded-2xl p-3 text-gray-200 border border-gray-700">
          {/* Row 1 → Textarea (Full Width) */}
          <div className="w-full mb-3">
            <textarea
              ref={textareaRef}
              rows={2}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask Gemini..."
              disabled={loading}
              className="w-full bg-transparent resize-none outline-none text-base placeholder-gray-400 overflow-y-auto px-2 max-h-40 min-h-10 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent disabled:opacity-50"
              style={{
                maxHeight: "160px",
                minHeight: "40px",
              }}
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="text-red-400 text-xs mb-2 px-2">
              Error: {error}
            </div>
          )}

          {/* Row 2 → Buttons */}
          <div className="flex items-center justify-between pt-2">
            {/* Left Side Buttons */}
            <div className="flex items-center space-x-3">
              {/* Add Button */}
              <button type="button" className="p-2 rounded-full hover:bg-gray-800 transition" disabled={loading}>
                <Plus size={20} />
              </button>

              {/* Tools Button */}
              <button type="button" className="flex items-center space-x-1 px-3 py-2 rounded-full hover:bg-gray-800 transition text-sm font-medium" disabled={loading}>
                <Settings2 size={16} />
                <span>Tools</span>
              </button>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center space-x-3">
              {/* Mic Button */}
              <button type="button" className="p-2 rounded-full hover:bg-gray-800 transition" disabled={loading}>
                <Mic size={20} />
              </button>

              {/* Send Button */}
              <button type="submit" className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading || !text.trim()}>
                <Send size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Intent Cards - Only show when no messages */}
      {messages.length === 0 && (
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {intentCards.map((card, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setText(card.label)}
              className="px-6 py-3 rounded-xl bg-gray-800 text-white font-semibold shadow hover:bg-gray-700 transition text-base"
            >
              {card.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
