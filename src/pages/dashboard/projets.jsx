import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

// ══════════════════════════════════════════════════════════
// DONNÉES DES PROJETS
// ══════════════════════════════════════════════════════════
// Statuts possibles : "termine" | "encours" | "avenir"
const STATUTS = {
  termine: { label: "Terminé", color: "#059669", icon: "bx-check-circle" },
  encours: { label: "En cours", color: "#d97706", icon: "bx-loader-circle" },
  avenir: { label: "À venir", color: "#6366f1", icon: "bx-calendar-star" },
};

// Types possibles : "web" | "mobile" | "data" | "ai" | "hybride"
const TYPES = {
  web: { label: "Web" },
  mobile: { label: "Mobile" },
  data: { label: "Data" },
  ai: { label: "IA" },
  hybride: { label: "Web & Mobile" },
};

const projets = [
  {
    key: "supmti",
    type: "mobile",
    status: "termine",
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
      { name: "Java", icon: "bx-code-alt" },
      { name: "Android Studio", icon: "bxl-android" },
      { name: "Firebase Auth", icon: "bxl-firebase" },
      { name: "Cloud Firestore", icon: "bxl-firebase" },
      { name: "Fragments Android", icon: "bx-layer" },
    ],
  },
  {
    key: "campuslink",
    type: "web",
    status: "termine",
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
      { name: "React.js", icon: "bxl-react" },
      { name: "Laravel", icon: "bxl-laravel" },
      { name: "MySQL", icon: "bx-data" },
      { name: "API REST", icon: "bx-transfer" },
      { name: "FullCalendar", icon: "bx-calendar" },
      { name: "Capacitor", icon: "bx-mobile-alt" },
      { name: "Star UML", icon: "bx-sitemap" },
    ],
  },
  {
    key: "smartel",
    type: "data",
    status: "termine",
    color: "#dc2626",
    icon: "bx bx-data",
    github: "https://github.com/jeremiedescarte",
    live: null,
    fonctionnalites: [],
    techs: [
      { name: "SQL", icon: "bx-code-curly" },
      { name: "Oracle Database", icon: "bx-cylinder" },
      { name: "SQL Developer", icon: "bx-terminal" },
      { name: "Scrum", icon: "bx-refresh" },
      { name: "Jira", icon: "bx-task" },
      { name: "GitHub", icon: "bxl-github" },
      { name: "Discord", icon: "bxl-discord" },
    ],
  },
  {
    key: "portfolio",
    type: "web",
    status: "encours",
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
      { name: "React.js", icon: "bxl-react" },
      { name: "Tailwind CSS", icon: "bxl-tailwind-css" },
      { name: "Vs Code", icon: "bxl-vscode" },
      { name: "Vercel", icon: "bx-rocket" },
      { name: "Resend", icon: "bx-envelope" },
      { name: "Hugging Face", icon: "bx-bot" },
    ],
  },
  {
    key: "ids",
    type: "ai",
    status: "termine",
    color: "#f59e0b",
    icon: "bx bx-shield-quarter",
    github: null,
    live: null,
    fonctionnalites: [
      "competences.proj.ids.f1",
      "competences.proj.ids.f2",
      "competences.proj.ids.f3",
      "competences.proj.ids.f4",
    ],
    techs: [
      { name: "Python", icon: "bxl-python" },
      { name: "Scikit-Learn", icon: "bx-line-chart" },
      { name: "XGBoost", icon: "bx-trending-up" },
      { name: "TensorFlow", icon: "bx-chip" },
      { name: "CICIDS2017", icon: "bx-data" },
      { name: "Pandas", icon: "bx-table" },
    ],
  },
  {
    key: "zonely",
    type: "web & mobile",
    status: "avenir",
    color: "#ec4899",
    icon: "bx bx-building-house",
    github: null,
    live: null,
    fonctionnalites: [
      "competences.proj.zonely.f1",
      "competences.proj.zonely.f2",
      "competences.proj.zonely.f3",
      "competences.proj.zonely.f4",
    ],
    techs: [
      { name: "React", icon: "bxl-react" },
      { name: "Laravel", icon: "bxl-laravel" },
      { name: "PostgreSQL", icon: "bx-data" },
      { name: "IA", icon: "bx-brain" },
      { name: "Maps API", icon: "bx-map" },
      { name: "Tailwind CSS", icon: "bxl-tailwind-css" },
    ],
  },
  {
    key: "callfree",
    type: "hybride",
    status: "avenir",
    color: "#0891b2",
    icon: "bx bx-phone-call",
    github: null,
    live: null,
    fonctionnalites: [
      "competences.proj.callfree.f1",
      "competences.proj.callfree.f2",
      "competences.proj.callfree.f3",
      "competences.proj.callfree.f4",
    ],
    techs: [
      { name: "React", icon: "bxl-react" },
      { name: "Flutter", icon: "bxl-flutter" },
      { name: "Node.js", icon: "bxl-nodejs" },
      { name: "WebRTC", icon: "bx-video" },
      { name: "Socket.io", icon: "bx-broadcast" },
      { name: "MongoDB", icon: "bx-data" },
    ],
  },
  {
    key: "telecomai",
    type: "ai",
    status: "avenir",
    color: "#f97316",
    icon: "bx bx-broadcast",
    github: null,
    live: null,
    fonctionnalites: [
      "competences.proj.telecomai.f1",
      "competences.proj.telecomai.f2",
      "competences.proj.telecomai.f3",
      "competences.proj.telecomai.f4",
    ],
    techs: [
      { name: "Python", icon: "bxl-python" },
      { name: "FastAPI", icon: "bx-server" },
      { name: "LangGraph", icon: "bx-sitemap" },
      { name: "Llama", icon: "bx-bot" },
      { name: "RAG", icon: "bx-search-alt" },
      { name: "PostgreSQL", icon: "bx-data" },
    ],
  },
  {
    key: "assurai",
    type: "ai",
    status: "termine",
    color: "#14b8a6",
    icon: "bx bx-car",
    github: null,
    live: null,
    fonctionnalites: [
      "competences.proj.assurai.f1",
      "competences.proj.assurai.f2",
      "competences.proj.assurai.f3",
      "competences.proj.assurai.f4",
    ],
    techs: [
      { name: "Gemini Vision", icon: "bx-brain" },
      { name: "Python", icon: "bxl-python" },
      { name: "Multimodal AI", icon: "bx-camera" },
      { name: "API REST", icon: "bx-transfer" },
    ],
  },
];


const FILTERS_TYPE = [
  { key: "all", label: "Tous" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
  { key: "data", label: "Data" },
  { key: "ai", label: "IA" },
  { key: "hybride", label: "Web & Mobile" },
];

const FILTERS_STATUT = [
  { key: "all", label: "Tous statuts" },
  { key: "termine", label: "Terminé" },
  { key: "encours", label: "En cours" },
  { key: "avenir", label: "À venir" },
];

// ══════════════════════════════════════════════════════════
// BADGE TECH
// ══════════════════════════════════════════════════════════
const BadgeTech = ({ name, icon, color }) => (
  <span
    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
    style={{
      background: `${color}15`,
      border: `1px solid ${color}30`,
      color: color,
    }}
  >
    <i className={`bx ${icon} text-sm`} />
    {name}
  </span>
);

// ══════════════════════════════════════════════════════════
// CARTE PROJET (grille)
// ══════════════════════════════════════════════════════════
const CarteProjet = ({ projet, onOpen }) => {
  const { t } = useTranslation(["projets", "competences"]);

  return (
    <button
      onClick={() => onOpen(projet.key)}
      className="group relative text-left rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 flex flex-col"
      style={{
        background: "var(--fond-surface)",
        border: "1px solid var(--bordure-douce)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${projet.color}60`;
        e.currentTarget.style.boxShadow = `0 12px 24px -12px ${projet.color}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--bordure-douce)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Badges type */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
          style={{ background: `${projet.color}18`, color: projet.color }}
        >
          {TYPES[projet.type]?.label ?? projet.type}
        </span>

      </div>

      {/* Icône */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${projet.color}20`, border: `1px solid ${projet.color}30` }}
      >
        <i className={`${projet.icon} text-2xl`} style={{ color: projet.color }} />
      </div>

      {/* Titre + tagline */}
      <p className="text-base font-semibold leading-tight mb-1" style={{ color: "var(--texte-principal)" }}>
        {t(`competences.proj.${projet.key}.name`)}
      </p>
      <p className="text-xs mb-4 line-clamp-2" style={{ color: "var(--texte-tertiaire)" }}>
        {t(`competences.proj.${projet.key}.tagline`)}
      </p>

      {/* Techs (max 3) */}
      <div className="flex flex-wrap gap-1.5 mt-auto mb-3">
        {projet.techs.slice(0, 3).map((tech) => (
          <span
            key={tech.name}
            className="text-[10px] px-2 py-0.5 rounded-md"
            style={{ background: "var(--fond-eleve)", color: "var(--texte-tertiaire)" }}
          >
            {tech.name}
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

      {/* Call to action */}
      <div
        className="flex items-center gap-1 text-xs font-medium transition-transform duration-300 group-hover:translate-x-1"
        style={{ color: projet.color }}
      >
        {t("projets.viewDetails", { defaultValue: "Voir le projet" })}
        <i className="bx bx-right-arrow-alt text-base" />

          {/* Badges statut */}
          {projet.status && (
          <span
            className="absolute right-4 flex  text-[10px] px-2 py-0.5 right-4 rounded-full font-medium"
            style={{
              background: `${STATUTS[projet.status].color}18`,
              color: STATUTS[projet.status].color,
            }}
          >
            <i className={`bx ${STATUTS[projet.status].icon} text-xs`} />
            {STATUTS[projet.status].label}
          </span>
        )} 
      </div>
    </button>
  );
};

// ══════════════════════════════════════════════════════════
// MODAL DÉTAIL PROJET
// ══════════════════════════════════════════════════════════
const ModalProjet = ({ projet, onClose }) => {
  const { t } = useTranslation(["projets", "competences"]);
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));

    const handleKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 180);
  };

  if (!projet) return null;

  const features = t(`competences.proj.${projet.key}.features`, {
    returnObjects: true,
    defaultValue: [],
  });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200"
      style={{
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        opacity: visible ? 1 : 0,
      }}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div
        className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 transition-all duration-200"
        style={{
          background: "var(--fond-surface)",
          border: "1px solid var(--bordure-douce)",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(8px)",
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Bouton fermer */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "var(--fond-eleve)", color: "var(--texte-secondaire)" }}
          aria-label="Fermer"
        >
          <i className="bx bx-x text-xl" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pr-10">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${projet.color}20`, border: `1px solid ${projet.color}40` }}
          >
            <i className={`${projet.icon} text-2xl`} style={{ color: projet.color }} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold" style={{ color: "var(--texte-principal)" }}>
              {t(`competences.proj.${projet.key}.name`)}
            </h2>
            <p className="text-xs" style={{ color: "var(--texte-tertiaire)" }}>
              {t(`competences.proj.${projet.key}.tagline`)}
            </p>
          </div>
          {projet.status && (
            <span
              className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-medium flex-shrink-0"
              style={{
                background: `${STATUTS[projet.status].color}18`,
                color: STATUTS[projet.status].color,
              }}
            >
              <i className={`bx ${STATUTS[projet.status].icon} text-xs`} />
              {STATUTS[projet.status].label}
            </span>
          )}
        </div>

        {/* Liens */}
        {(projet.github || projet.live) && (
          <div className="flex gap-2 mb-5">
            {projet.github && (
              <a
                href={projet.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-transform hover:scale-105"
                style={{
                  background: "var(--fond-eleve)",
                  color: "var(--texte-secondaire)",
                  border: "1px solid var(--bordure-douce)",
                }}
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-transform hover:scale-105"
                style={{
                  background: `${projet.color}20`,
                  color: projet.color,
                  border: `1px solid ${projet.color}40`,
                }}
              >
                <i className="bx bx-link-external text-sm" />
                Live
              </a>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--texte-secondaire)" }}>
          {t(`competences.proj.${projet.key}.desc`)}
        </p>

        {/* Fonctionnalités */}
        {features.length > 0 && (
          <div className="mb-5">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--texte-tertiaire)" }}>
              {t("projets.features")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <i className="bx bx-check text-base flex-shrink-0" style={{ color: projet.color }} />
                  <span className="text-sm" style={{ color: "var(--texte-secondaire)" }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--texte-tertiaire)" }}>
            {t("projets.technologies")}
          </p>
          <div className="flex flex-wrap gap-2">
            {projet.techs.map((tech) => (
              <BadgeTech key={tech.name} name={tech.name} icon={tech.icon} color={projet.color} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════
const Projets = () => {
  const { t } = useTranslation(["projets", "competences"]);
  const [filterType, setFilterType] = useState("all");
  const [filterStatut, setFilterStatut] = useState("all");
  const [openKey, setOpenKey] = useState(null);

  const projetsFiltres = projets.filter(
    (p) =>
      (filterType === "all" || p.type === filterType) &&
      (filterStatut === "all" || p.status === filterStatut)
  );
  const projetOuvert = projets.find((p) => p.key === openKey);

  return (
    <div className="max-w-5xl mx-auto">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--texte-principal)" }}>
          {t("projets.title")}
        </h1>
        <p className="text-sm" style={{ color: "var(--texte-secondaire)" }}>
          {t("projets.subtitle")}
        </p>
      </div>

      {/* Filtres type */}
      <div className="flex flex-wrap gap-2 mb-3">
        {FILTERS_TYPE.map((f) => {
          const count =
            f.key === "all" ? projets.length : projets.filter((p) => p.type === f.key).length;
          const actif = filterType === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilterType(f.key)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: actif ? "var(--texte-principal)" : "var(--fond-surface)",
                color: actif ? "var(--fond-principal)" : "var(--texte-secondaire)",
                border: "1px solid var(--bordure-douce)",
              }}
            >
              {t(`projets.filter${f.key.charAt(0).toUpperCase() + f.key.slice(1)}`, {
                defaultValue: f.label,
              })}
              <span
                className="text-[10px] px-1.5 rounded-full"
                style={{
                  background: actif ? "rgba(255,255,255,0.2)" : "var(--fond-eleve)",
                  color: actif ? "inherit" : "var(--texte-muet)",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filtres statut */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS_STATUT.map((f) => {
          const actif = filterStatut === f.key;
          const couleur = f.key === "all" ? "var(--texte-secondaire)" : STATUTS[f.key].color;
          return (
            <button
              key={f.key}
              onClick={() => setFilterStatut(f.key)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all"
              style={{
                background: actif ? `${couleur}20` : "transparent",
                color: couleur,
                border: `1px solid ${actif ? couleur + "60" : "var(--bordure-douce)"}`,
              }}
            >
              {f.key !== "all" && <i className={`bx ${STATUTS[f.key].icon} text-xs`} />}
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Grille de projets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projetsFiltres.map((p) => (
          <CarteProjet key={p.key} projet={p} onOpen={setOpenKey} />
        ))}
      </div>

      {/* Modal détail */}
      {projetOuvert && <ModalProjet projet={projetOuvert} onClose={() => setOpenKey(null)} />}
    </div>
  );
};

export default Projets;