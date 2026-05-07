import React from "react";
import { useState, useRef, useEffect } from "react";


// ── Suggestions rapides ──
const SUGGESTIONS = [
  { label: "Compétences ?",     text: "Quelles sont tes compétences principales ?" },
  { label: "Campus Link",       text: "Parle-moi du projet Campus Link" },
  { label: "Open to work ?",    text: "Are you open to international opportunities?" },
  { label: "Stack tech ?",      text: "Quel est ton stack technique ?" },
  { label: "Expérience ?",      text: "Parle-moi de ton expérience professionnelle" },
];

export default function Chatbot() {

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Bonjour ! Je suis l'assistant IA de Jeremie. Posez-moi vos questions sur son profil, ses compétences ou ses projets — en français ou en anglais 🙂",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [history, setHistory] = useState([]);
  const bottomRef = useRef(null);

  // Scroll automatique vers le bas à chaque nouveau message
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

      const data = await res.json();
      const reply = data.reply || "Désolé, je n'ai pas pu répondre.";

      setHistory([...newHistory, { role: "assistant", content: reply }]);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

    } catch (error) {
      console.error("Erreur chat:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Erreur de connexion. Veuillez réessayer." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    /*
      ── Conteneur principal ──
      - w-full          : prend toute la largeur disponible
      - max-w-lg        : limité à 512px sur grands écrans
      - mx-auto         : centré horizontalement
      - h-[85vh]        : 85% de la hauteur de l'écran sur mobile
      - sm:h-[520px]    : hauteur fixe à partir de 640px (tablette/desktop)
      - flex flex-col   : disposition verticale des blocs
    */
    <div className="flex flex-col w-full max-w-lg mx-auto h-[85vh] sm:h-[520px] rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900 shadow-sm">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-3 sm:px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
        {/* Avatar — légèrement plus petit sur mobile */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 flex-shrink-0">
          JA
        </div>
        <div className="min-w-0">
          {/* truncate évite le débordement du texte sur très petits écrans */}
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            Jeremie — Assistant IA
          </p>
          <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block flex-shrink-0" />
            En ligne
          </p>
        </div>
      </div>

      {/* ── Zone des messages ── */}
      {/*
        flex-1        : occupe tout l'espace restant entre header et input
        overflow-y-auto : scroll vertical si les messages dépassent
        min-h-0       : essentiel en flexbox pour que overflow-y-auto fonctionne
      */}
      <div className="flex-1 overflow-y-auto min-h-0 px-3 sm:px-4 py-4 flex flex-col gap-3">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${
              msg.role === "user"
                // Utilisateur : aligné à droite, max 85% de largeur
                ? "self-end flex-row-reverse max-w-[85%]"
                // Assistant : aligné à gauche, max 90% sur mobile, 85% sur desktop
                : "self-start max-w-[90%] sm:max-w-[85%]"
            }`}
          >
            {/* Avatar assistant uniquement */}
            {msg.role === "assistant" && (
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-medium text-blue-700 dark:text-blue-300 mt-0.5 flex-shrink-0">
                JA
              </div>
            )}

            {/* Bulle message */}
            <div
              className={`px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* ── Animation de frappe ── */}
        {loading && (
          <div className="flex gap-2 self-start max-w-[90%] sm:max-w-[85%]">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-medium text-blue-700 dark:text-blue-300 mt-0.5 flex-shrink-0">
              JA
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-gray-100 dark:bg-gray-800 flex gap-1 items-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Ancre pour le scroll automatique */}
        <div ref={bottomRef} />
      </div>

      {/* ── Suggestions rapides ── */}
      {/*
        flex-shrink-0 : empêche cette zone de rétrécir en flex column
        Sur mobile les chips peuvent wrapper sur 2 lignes — c'est voulu
      */}
      {showSuggestions && (
        <div className="flex gap-1.5 sm:gap-2 flex-wrap px-3 sm:px-4 pb-2 flex-shrink-0">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.label}
              onClick={() => send(s.text)}
              className="text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer"
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Zone de saisie ── */}
      {/*
        flex-shrink-0 : cette barre reste toujours visible en bas
        gap réduit sur mobile pour optimiser l'espace
      */}
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-gray-100 dark:border-gray-800 flex gap-2 items-center flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Posez votre question..."
          // text-base sur mobile évite le zoom automatique iOS (minimum 16px)
          className="flex-1 text-base sm:text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* Bouton envoi — taille légèrement plus grande sur mobile pour le touch */}
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          className="w-10 h-10 sm:w-9 sm:h-9 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-opacity flex-shrink-0 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
        </button>
      </div>

    </div>
  );
}