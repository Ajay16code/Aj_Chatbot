import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendMessage } from "../services/chatService";
import Navbar from "../components/layout/Navbar.jsx";

const modeConfig = {
  support: { color: "#FF6B6B", emoji: "🆘", title: "Support Mode" },
  study: { color: "#4ECDC4", emoji: "📚", title: "Study Mode" },
  stress: { color: "#FFE66D", emoji: "😌", title: "Stress Relief" },
};

export default function ChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = new URLSearchParams(location.search).get("mode") || "support";
  const config = modeConfig[mode] || modeConfig.support;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMsg = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await sendMessage(mode, userMsg);
      setMessages((prev) => [...prev, { sender: "bot", text: res.reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setError("Failed to connect to backend. Make sure the server is running.");
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ " + (err.message || "Connection error") }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <Navbar />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
        {/* Header */}
        <div style={{ background: "white", borderRadius: "16px", padding: "20px", marginBottom: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "32px" }}>{config.emoji}</span>
              <h1 style={{ fontSize: "28px", fontWeight: "700", margin: 0, color: "#1f2937" }}>{config.title}</h1>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                padding: "8px 16px",
                background: "#f3f4f6",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                color: "#6b7280",
              }}
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div style={{
            background: "#FEE2E2",
            color: "#991B1B",
            padding: "12px 16px",
            borderRadius: "12px",
            marginBottom: "16px",
            borderLeft: "4px solid #DC2626",
          }}>
            {error}
          </div>
        )}

        {/* Chat Container */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          height: "500px",
          overflow: "hidden",
          marginBottom: "16px",
        }}>
          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}>
            {messages.length === 0 && (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#9ca3af",
                fontSize: "16px",
              }}>
                Start a conversation with {config.title}
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    wordWrap: "break-word",
                    background: m.sender === "user" ? config.color : "#f3f4f6",
                    color: m.sender === "user" ? "white" : "#1f2937",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    boxShadow: m.sender === "user" ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#9ca3af",
                  animation: "bounce 1.4s infinite",
                }}></div>
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#9ca3af",
                  animation: "bounce 1.4s infinite 0.2s",
                }}></div>
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#9ca3af",
                  animation: "bounce 1.4s infinite 0.4s",
                }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            borderTop: "1px solid #e5e7eb",
            padding: "16px 20px",
            background: "#fafafa",
            display: "flex",
            gap: "12px",
          }}>
            <input
              type="text"
              style={{
                flex: 1,
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "12px 14px",
                fontSize: "14px",
                fontFamily: "inherit",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.target.style.borderColor = config.color}
              onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !loading && sendMsg()}
              disabled={loading}
            />

            <button
              onClick={sendMsg}
              disabled={loading || !input.trim()}
              style={{
                padding: "12px 24px",
                background: loading || !input.trim() ? "#d1d5db" : config.color,
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.2s",
                opacity: loading || !input.trim() ? 0.7 : 1,
              }}
            >
              {loading ? "⏳" : "Send"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
