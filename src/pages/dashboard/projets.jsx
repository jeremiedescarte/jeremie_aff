import { useState } from "react";
import { useTranslation } from "react-i18next";

// ══════════════════════════════════════════════════════════
// DONNÉES DES PROJETS
// ══════════════════════════════════════════════════════════
const projets = [
  {
    key: "supmti",
    type: "mobile",
    color: "#00abf0",
    icon: "bx bxl-android",
    github: null,
    live: null,
    fonctionnalites: [
      "competences.proj.supmti.f1",
      "competences.proj.supmti.f2",
      "competences.proj.supmti.f3",
      "competences.proj.supmti.f4",
      "competences.proj.supmti.f5",
      "competences.proj.supmti.f6",
      "competences.proj.supmti.f7",
    ],
    techs: [
      { name: "Java",                  icon: "bx-code-alt" },
      { name: "Android Studio",        icon: "bxl-android" },
      { name: "Firebase Auth",         icon: "bxl-firebase" },
      { name: "Cloud Firestore",       icon: "bxl-firebase" },
      { name: "Fragments Android",     icon: "bx-layer" },
    ],
  },
  {
    key: "campuslink",
    type: "web",
    color: "#7c3aed",
    icon: "bx bx-globe",
    github: null,
    live: null,
    fonctionnalites: [
      "competences.proj.campuslink.f1",
      "competences.proj.campuslink.f2",
      "competences.proj.campuslink.f3",
      "competences.proj.campuslink.f4",
      "competences.proj.campuslink.f5",
      "competences.proj.campuslink.f6",
      "competences.proj.campuslink.f7",
      "competences.proj.campuslink.f8",
    ],
    techs: [
      { name: "React.js",     icon: "bxl-react" },
      { name: "Laravel",      icon: "bxl-laravel" },
      { name: "MySQL",        icon: "bx-data" },
      { name: "API REST",     icon: "bx-transfer" },
      { name: "FullCalendar", icon: "bx-calendar" },
      { name: "Capacitor",    icon: "bx-mobile-alt" },
      { name: "Star UML",     icon: "bx-sitemap" },
    ],
  },

  {
  key: "smartel",
  type: "web",
  color: "#dc2626",
  icon: "bx bx-data",
  github: "https://github.com/jeremiedescarte",
  live: null,
  techs: [
    { name: "SQL",             icon: "bx-code-curly" },
    { name: "Oracle Database", icon: "bx-cylinder" },
    { name: "SQL Developer",   icon: "bx-terminal" },
    { name: "Scrum",           icon: "bx-refresh" },
    { name: "Jira",            icon: "bx-task" },
    { name: "GitHub",          icon: "bxl-github" },
    { name: "Discord",         icon: "bxl-discord" },
  ],
},
  {
    key: "portfolio",
    type: "web",
    color: "#059669",
    icon: "bx bx-user-circle",
    github: "https://github.com/jeremiedescarte",
    live: null,
    fonctionnalites: [
      "competences.proj.portfolio.f1",
      "competences.proj.portfolio.f2",
      "competences.proj.portfolio.f3",
      "competences.proj.portfolio.f4",
      "competences.proj.portfolio.f5",
      "competences.proj.portfolio.f6",
      "competences.proj.portfolio.f7",
    ],
    techs: [
      { name: "React.js",     icon: "bxl-react" },
      { name: "Tailwind CSS", icon: "bxl-tailwind-css" },
      { name: "Vs Code",     icon: "bxl-vscode" },
      { name: "Vercel",       icon: "bx-rocket" },
      { name: "Resend",       icon: "bx-envelope" },
      { name: "Hugging Face", icon: "bx-bot" },
    ],
  },
];

// ══════════════════════════════════════════════════════════
// BADGE TECH
// ══════════════════════════════════════════════════════════
const BadgeTech = ({ name, icon, color }) => (
  <span
    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
    style={{
      background: `${color}15`,
      border:     `1px solid ${color}30`,
      color:      color,
    }}
  >
    <i className={`bx ${icon} text-sm`} />
    {name}
  </span>
);

// ══════════════════════════════════════════════════════════
// CARTE PROJET
// ══════════════════════════════════════════════════════════
const CarteProjet = ({ projet, onClick, isSelected }) => {
  const { t } = useTranslation(["projets", "competences"]);
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };
  return (
    <button
      onClick={() => onClick(projet.key)}
      className="w-full text-left rounded-xl p-5 transition-all duration-200"
      style={{
        background: isSelected ? `${projet.color}12` : "var(--fond-surface)",
        border:     isSelected
          ? `1px solid ${projet.color}50`
          : "1px solid var(--bordure-douce)",
        boxShadow:  isSelected ? `0 0 0 1px ${projet.color}20` : "none",
      }}
    >
      {/* Header carte */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${projet.color}20`, border: `1px solid ${projet.color}30` }}
        >
          <i className={`${projet.icon} text-xl`} style={{ color: projet.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight mb-0.5" style={{ color: "var(--texte-principal)" }}>
            {t(`competences.proj.${projet.key}.name`)}
          </p>
          <p className="text-xs" style={{ color: "var(--texte-tertiaire)" }}>
            {t(`competences.proj.${projet.key}.tagline`)}
          </p>
        </div>
        {/* Badge type */}
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
          style={{ background: `${projet.color}20`, color: projet.color }}
        >
          {projet.type === "mobile" ? "Mobile" : "Web"}
        </span>
      </div>

      {/* Techs principales (max 3) */}
      <div className="flex flex-wrap gap-1.5">
        {projet.techs.slice(0, 3).map((t) => (
          <span
            key={t.name}
            className="text-[10px] px-2 py-0.5 rounded-md"
            style={{ background: "var(--fond-eleve)", color: "var(--texte-tertiaire)" }}
          >
            {t.name}
          </span>
        ))}
        {projet.techs.length > 3 && (
          <span
            className="text-[10px] px-2 py-0.5 rounded-md"
            style={{ background: "var(--fond-eleve)", color: "var(--texte-muet)" }}
          >
            +{projet.techs.length - 3}
          </span>
        )}
      </div>
    </button>
  );
};

// ══════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════
const Projets = () => {
  const { t } = useTranslation(["projets", "competences"]);
  const [selected, setSelected] = useState("supmti");
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const projet = projets.find((p) => p.key === selected);

  const handleSelect = (key) => setSelected(key);

  return (
    <div className="max-w-5xl mx-auto">

      {/* ── En-tête ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--texte-principal)" }}>
          {t("projets.title")}
        </h1>
        <p className="text-sm" style={{ color: "var(--texte-secondaire)" }}>
          {t("projets.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Colonne gauche : liste des projets ── */}
        <div className="flex flex-col gap-3">
          {projets.map((p) => (
            <CarteProjet
              key={p.key}
              projet={p}
              onClick={handleSelect}
              isSelected={selected === p.key}
            />
          ))}
        </div>

        {/* ── Colonne droite : détail du projet ── */}
        {projet && (
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Header détail */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${projet.color}20`, border: `1px solid ${projet.color}40` }}
                >
                  <i className={`${projet.icon} text-2xl`} style={{ color: projet.color }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: "var(--texte-principal)" }}>
                    {t(`competences.proj.${projet.key}.name`)}
                  </h2>
                  <p className="text-xs" style={{ color: "var(--texte-tertiaire)" }}>
                    {t(`competences.proj.${projet.key}.tagline`)}
                  </p>
                </div>

                {/* Liens GitHub / Live */}
                <div className="ml-auto flex gap-2">
                  {projet.github && (
                    <a
                      href={projet.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                      style={{ background: "var(--fond-eleve)", color: "var(--texte-secondaire)", border: "1px solid var(--bordure-douce)" }}
                    >
                      <i className="bx bxl-github text-sm" />
                      GitHub
                    </a>
                  )}
                  {projet.live && (
                    <a
                      href={projet.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                      style={{ background: `${projet.color}20`, color: projet.color, border: `1px solid ${projet.color}40` }}
                    >
                      <i className="bx bx-link-external text-sm" />
                      Live
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: "var(--texte-secondaire)" }}>
                {t(`competences.proj.${projet.key}.desc`)}
              </p>
            </div>

            {/* Fonctionnalités */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
            >
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--texte-tertiaire)" }}>
                {t("projets.features")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {t(`competences.proj.${projet.key}.features`, { returnObjects: true, defaultValue: [] }).map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <i className="bx bx-check text-base flex-shrink-0" style={{ color: projet.color }} />
                    <span className="text-sm" style={{ color: "var(--texte-secondaire)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
            >
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--texte-tertiaire)" }}>
                {t("projets.technologies")}
              </p>
              <div className="flex flex-wrap gap-2">
                {projet.techs.map((tech) => (
                  <BadgeTech key={tech.name} name={tech.name} icon={tech.icon} color={projet.color} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projets;