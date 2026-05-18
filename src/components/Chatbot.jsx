import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Chatbot() {
  const { t, i18n } = useTranslation("chat");

  const SUGGESTIONS = [
    { label: t("chat.suggestions.s1", "Compétences ?"),    text: t("chat.suggestions.s1t", "Quelles sont tes compétences principales ?") },
    { label: t("chat.suggestions.s2", "Campus Link"),      text: t("chat.suggestions.s2t", "Parle-moi du projet Campus Link") },
    { label: t("chat.suggestions.s3", "Open to work ?"),   text: t("chat.suggestions.s3t", "Are you open to international opportunities?") },
    { label: t("chat.suggestions.s4", "Stack tech ?"),     text: t("chat.suggestions.s4t", "Quel est ton stack technique ?") },
    { label: t("chat.suggestions.s5", "Expérience ?"),     text: t("chat.suggestions.s5t", "Parle-moi de ton expérience professionnelle") },
  ];

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: t("chat.welcome"),
      },
    ]);
  }, [i18n.language]);
  const [input, setInput]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [history, setHistory]           = useState([]);
  const bottomRef                       = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    setInput("");
    setShowSuggestions(false);

    const newHistory = [...history, { role: "user", content: userText }];
    setHistory(newHistory);
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data  = await res.json();
      const reply = data.reply || t("chat.errorDefault", "Désolé, je n'ai pas pu répondre.");

      setHistory([...newHistory, { role: "assistant", content: reply }]);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Erreur chat:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("chat.errorNetwork", "Erreur de connexion. Veuillez réessayer.") },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      {/* ── Fenêtre chat ── */}
      <div
        className="flex flex-col w-full rounded-2xl overflow-hidden"
        style={{
          background:  "var(--fond-surface)",
          border:      "1px solid var(--bordure-douce)",
          boxShadow:   "var(--ombre-carte)",
          height:      "85vh",
          maxHeight:   "600px",
        }}
      >

        {/* ── Header chat ── */}
        <div
          className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{
            background:   "var(--fond-eleve)",
            borderBottom: "1px solid var(--bordure-douce)",
          }}
        >
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ background: "var(--accent)", color: "var(--accent-texte)" }}
          >
            JA
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: "var(--texte-principal)" }}>
              Jeremie — {t("chat.assistantLabel", "Assistant ")}
            </p>
            <p className="text-xs flex items-center gap-1.5" style={{ color: "#22c55e" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block flex-shrink-0 animate-pulse" />
              {t("chat.online", "En ligne")}
            </p>
          </div>

          {/* Icône bot */}
          <div className="ml-auto">
            <i className="bx bx-bot text-xl" style={{ color: "var(--accent)" }} />
          </div>
        </div>

        {/* ── Zone messages ── */}
        <div
          className="flex-1 overflow-y-auto min-h-0 px-4 py-4 flex flex-col gap-3"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 ${
                msg.role === "user"
                  ? "self-end flex-row-reverse max-w-[85%]"
                  : "self-start max-w-[90%] sm:max-w-[85%]"
              }`}
            >
              {/* Avatar assistant */}
              {msg.role === "assistant" && (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0"
                  style={{ background: "var(--accent)", color: "var(--accent-texte)" }}
                >
                  JA
                </div>
              )}

              {/* Bulle message */}
              <div
                className="px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                style={
                  msg.role === "user"
                    ? {
                        background:   "var(--accent)",
                        color:        "var(--accent-texte)",
                        borderRadius: "1rem 1rem 0.25rem 1rem",
                      }
                    : {
                        background:   "var(--fond-eleve)",
                        color:        "var(--texte-principal)",
                        border:       "1px solid var(--bordure-douce)",
                        borderRadius: "1rem 1rem 1rem 0.25rem",
                      }
                }
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* ── Animation de frappe ── */}
          {loading && (
            <div className="flex gap-2 self-start">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0"
                style={{ background: "var(--accent)", color: "var(--accent-texte)" }}
              >
                JA
              </div>
              <div
                className="px-4 py-3 rounded-2xl flex gap-1 items-center"
                style={{
                  background: "var(--fond-eleve)",
                  border:     "1px solid var(--bordure-douce)",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ background: "var(--accent)", animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── Suggestions rapides ── */}
        {showSuggestions && (
          <div
            className="flex gap-2 flex-wrap px-4 pb-2 flex-shrink-0 pt-2"
            style={{ borderTop: "1px solid var(--bordure-douce)" }}
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                onClick={() => send(s.text)}
                className="text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                style={{
                  border:     "1px solid var(--bordure-douce)",
                  color:      "var(--texte-tertiaire)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background   = "var(--accent-fond)";
                  e.currentTarget.style.color        = "var(--accent)";
                  e.currentTarget.style.borderColor  = "var(--accent-bordure)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background   = "transparent";
                  e.currentTarget.style.color        = "var(--texte-tertiaire)";
                  e.currentTarget.style.borderColor  = "var(--bordure-douce)";
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Zone de saisie ── */}
        <div
          className="px-4 py-3 flex gap-2 items-center flex-shrink-0"
          style={{ borderTop: "1px solid var(--bordure-douce)" }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={t("chat.placeholder", "Posez votre question...")}
            className="flex-1 text-sm px-4 py-2.5 rounded-xl focus:outline-none transition-colors"
            style={{
              background:  "var(--fond-base)",
              border:      "1px solid var(--bordure-douce)",
              color:       "var(--texte-principal)",
            }}
            onFocus={(e)  => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e)   => (e.target.style.borderColor = "var(--bordure-douce)")}
          />

          {/* Bouton envoi */}
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80"
            style={{ background: "var(--accent)", color: "var(--accent-texte)" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}