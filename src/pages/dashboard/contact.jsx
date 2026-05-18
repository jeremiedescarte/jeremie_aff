import { useState } from "react";
import { useTranslation } from "react-i18next";

const socials = [
  {
    icon: "bxl-linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/jeremie-affodo",
    href: "https://linkedin.com/in/jeremie-affodo",
    color: "#0077b5",
  },
  {
    icon: "bxl-github",
    label: "GitHub",
    value: "github.com/jeremiedescarte",
    href: "https://github.com/jeremiedescarte",
    color: "#ededed",
  },
  {
    icon: "bx-envelope",
    label: "Email",
    value: "enagnonjeremieaffodo@gmail.com",
    href: "mailto:enagnonjeremieaffodo@gmail.com",
    color: "#00abf0",
  },
];

const Contact = () => {
  const { t, i18n } = useTranslation("contact");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

    const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  // ── Style commun pour les inputs / textarea ──
  const styleInput = {
    background:  "var(--fond-base)",
    border:      "1px solid var(--bordure-douce)",
    color:       "var(--texte-principal)",
    borderRadius: "0.5rem",
    padding:     "0.625rem 1rem",
    fontSize:    "0.875rem",
    outline:     "none",
    width:       "100%",
    transition:  "border-color 0.2s ease",
  };

  return (
    <div className="max-w-5xl mx-auto animate-fadeIn">

      {/* ── En-tête ── */}
      <div className="mb-8">
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: "var(--texte-principal)" }}
        >
          {t("contact.title", "Contact")}
        </h1>
        <p className="text-sm" style={{ color: "var(--texte-secondaire)" }}>
          {t("contact.subtitle", "Une opportunité ? Un projet ? Écris-moi directement.")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ════════════════════════════════
            COLONNE GAUCHE : infos
        ════════════════════════════════ */}
        <div className="flex flex-col gap-4">

          {/* Carte disponibilité */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "var(--accent-fond)",
              border:     "1px solid var(--accent-bordure)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: "var(--accent)" }}
              >
                {t("contact.available", "Disponible")}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--texte-secondaire)" }}>
              {t(
                "contact.availableText",
                "Ouvert aux opportunités full-stack, stages et missions freelance à l'international."
              )}
            </p>
          </div>

          {/* Réseaux sociaux */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{
              background: "var(--fond-surface)",
              border:     "1px solid var(--bordure-douce)",
            }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: "var(--texte-tertiaire)" }}
            >
              {t("contact.findMe", "Me retrouver")}
            </p>

            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{
                    background: `${s.color}20`,
                    border:     `1px solid ${s.color}40`,
                  }}
                >
                  <i className={`bx ${s.icon} text-lg`} style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: "var(--texte-tertiaire)" }}>
                    {s.label}
                  </p>
                  <p
                    className="text-sm truncate max-w-[150px] transition-colors group-hover:text-[var(--accent)]"
                    style={{ color: "var(--texte-secondaire)" }}
                  >
                    {s.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Localisation */}
          <div
            className="rounded-xl p-4 flex items-center gap-3"
            style={{
              background: "var(--fond-surface)",
              border:     "1px solid var(--bordure-douce)",
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: "var(--accent-fond)",
                border:     "1px solid var(--accent-bordure)",
              }}
            >
              <i className="bx bx-map text-lg" style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: "var(--texte-tertiaire)" }}>
                {t("contact.location", "Localisation")}
              </p>
              <p className="text-sm" style={{ color: "var(--texte-secondaire)" }}>
                {t("contact.locationValue", "Beni Mellal, Maroc")}
              </p>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════
            COLONNE DROITE : formulaire
        ════════════════════════════════ */}
        <div
          className="lg:col-span-2 rounded-xl p-6"
          style={{
            background: "var(--fond-surface)",
            border:     "1px solid var(--bordure-douce)",
          }}
        >
          <p
            className="text-sm font-medium mb-5"
            style={{ color: "var(--texte-principal)" }}
          >
            {t("contact.formTitle", "Envoyer un message")}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Nom */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs" style={{ color: "var(--texte-secondaire)" }}>
                  {t("contact.name", "Nom")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  style={styleInput}
                  onFocus={(e)  => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e)   => (e.target.style.borderColor = "var(--bordure-douce)")}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs" style={{ color: "var(--texte-secondaire)" }}>
                  {t("contact.email", "Email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  style={styleInput}
                  onFocus={(e)  => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e)   => (e.target.style.borderColor = "var(--bordure-douce)")}
                />
              </div>
            </div>

            {/* Sujet */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs" style={{ color: "var(--texte-secondaire)" }}>
                {t("contact.subject", "Sujet")}
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder={t("contact.subjectPlaceholder", "Opportunité de collaboration...")}
                style={styleInput}
                onFocus={(e)  => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e)   => (e.target.style.borderColor = "var(--bordure-douce)")}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs" style={{ color: "var(--texte-secondaire)" }}>
                {t("contact.message", "Message")}
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={t("contact.messagePlaceholder", "Décris ton projet ou ton opportunité...")}
                style={{ ...styleInput, resize: "none" }}
                onFocus={(e)  => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e)   => (e.target.style.borderColor = "var(--bordure-douce)")}
              />
            </div>

            {/* ── Feedback succès ── */}
            {status === "success" && (
              <div
                className="flex items-center gap-2 text-sm rounded-lg px-4 py-2.5"
                style={{
                  color:      "var(--accent)",
                  background: "var(--accent-fond)",
                  border:     "1px solid var(--accent-bordure)",
                }}
              >
                <i className="bx bx-check-circle text-lg" />
                {t("contact.success", "Message envoyé avec succès !")}
              </div>
            )}

            {/* ── Feedback erreur ── */}
            {status === "error" && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
                <i className="bx bx-error-circle text-lg" />
                {t("contact.error", "Erreur lors de l'envoi. Réessaie.")}
              </div>
            )}

            {/* ── Bouton submit ── */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 px-6 py-3 font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "var(--accent)",
                color:      "var(--accent-texte)",
              }}
              onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.background = "var(--accent-survol)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)"; }}
            >
              {status === "sending" ? (
                <>
                  <i className="bx bx-loader-alt text-lg animate-spin" />
                  {t("contact.sending", "Envoi en cours...")}
                </>
              ) : (
                <>
                  <i className="bx bx-send text-lg" />
                  {t("contact.send", "Envoyer le message")}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;