import { useState } from "react";
import { useTranslation } from "react-i18next";

// ══════════════════════════════════════════════════════════
// DONNÉES
// ══════════════════════════════════════════════════════════

const experiencesPro = [
  {
    key: "us2i",
    icon: "bx bx-code-alt",
    color: "#00abf0",
    type: "stage",
    periode: "Avril – Juin 2025",
    lieu: "Beni Mellal, Maroc",
    missions: ["us2i.m1", "us2i.m2", "us2i.m3"],
    competences: ["us2i.c1", "us2i.c2", "us2i.c3", "us2i.c4"],
    techs: ["PHP", "Laravel", "MySQL", "React.js", "Star UML", "Agora Project", "VS Code"],
  },
  {
    key: "cesam",
    icon: "bx bx-trophy",
    color: "#f59e0b",
    type: "associatif",
    periode: "2024 – 2025",
    lieu: "Beni Mellal, Maroc",
    missions: ["cesam.m1", "cesam.m2", "cesam.m3"],
    competences: ["cesam.c1", "cesam.c2", "cesam.c3", "cesam.c4"],
    techs: ["SportEasy", "Excel", "Word", "Challonge"],
  },
  {
    key: "aseesim",
    icon: "bx bx-book-bookmark",
    color: "#059669",
    type: "associatif",
    periode: "2023 – 2024",
    lieu: "Beni Mellal, Maroc",
    missions: ["aseesim.m1", "aseesim.m2", "aseesim.m3"],
    competences: ["aseesim.c1", "aseesim.c2", "aseesim.c3", "aseesim.c4"],
    techs: ["Excel", "Word"],
  },
  {
    key: "bangolo",
    icon: "bx bx-store",
    color: "#be185d",
    type: "commercial",
    periode: "experience.bangolo.periode",
    lieu: "Bangolo, Côte d'Ivoire",
    missions: ["bangolo.m1", "bangolo.m2", "bangolo.m3"],
    competences: ["bangolo.c1", "bangolo.c2", "bangolo.c3", "bangolo.c4"],
    techs: [],
  },
];

const experiencesAcad = [
  {
    key: "campuslink",
    icon: "bx bx-globe",
    color: "#7c3aed",
    type: "pfe",
    periode: "Avril – Juin 2025",
    lieu: "SUPMTI Beni Mellal",
    missions: ["campuslink.m1", "campuslink.m2", "campuslink.m3", "campuslink.m4", "campuslink.m5", "campuslink.m6"],
    competences: ["campuslink.c1", "campuslink.c2", "campuslink.c3", "campuslink.c4", "campuslink.c5", "campuslink.c6"],
    techs: ["React.js", "Laravel", "MySQL", "Tailwind CSS", "Vite", "FullCalendar", "Star UML"],
  },
  {
    key: "supmticonnect",
    icon: "bx bxl-android",
    color: "#00abf0",
    type: "module",
    periode: "2025",
    lieu: "SUPMTI Beni Mellal",
    missions: ["supmticonnect.m1", "supmticonnect.m2", "supmticonnect.m3", "supmticonnect.m4"],
    competences: ["supmticonnect.c1", "supmticonnect.c2", "supmticonnect.c3", "supmticonnect.c4"],
    techs: ["Java", "Android Studio", "Firebase Auth", "Cloud Firestore"],
  },
  {
    key: "smartel",
    icon: "bx bx-data",
    color: "#dc2626",
    type: "projet",
    periode: "2026",
    lieu: "SUPMTI Beni Mellal",
    missions: ["smartel.m1", "smartel.m2", "smartel.m3", "smartel.m4", "smartel.m5", "smartel.m6"],
    competences: ["smartel.c1", "smartel.c2", "smartel.c3", "smartel.c4", "smartel.c5", "smartel.c6"],
    techs: ["SQL", "Oracle Database", "SQL Developer", "Scrum", "Jira", "GitHub", "Discord"],
  },
];

const experiencesTech = [
  { icon: "bxl-react",       color: "#00abf0", key: "t1" },
  { icon: "bxl-laravel",     color: "#7c3aed", key: "t2" },
  { icon: "bxl-android",     color: "#059669", key: "t3" },
  { icon: "bx-data",         color: "#dc2626", key: "t4" },
  { icon: "bx-transfer",     color: "#f59e0b", key: "t5" },
  { icon: "bxl-firebase",    color: "#d97706", key: "t6" },
  { icon: "bx-envelope",     color: "#0891b2", key: "t7" },
  { icon: "bx-calendar",     color: "#be185d", key: "t8" },
  { icon: "bx-mobile-alt",   color: "#7c3aed", key: "t9" },
  { icon: "bx-palette",      color: "#059669", key: "t10" },
  { icon: "bx-shield-alt-2", color: "#dc2626", key: "t11" },
  { icon: "bx-sitemap",      color: "#00abf0", key: "t12" },
  { icon: "bx-rocket",       color: "#f59e0b", key: "t13" },
  { icon: "bx-bot",          color: "#0891b2", key: "t14" },
  { icon: "bx-task",         color: "#be185d", key: "t15" },
  { icon: "bxl-github",      color: "#ededed", key: "t16" },
  { icon: "bx-refresh",      color: "#059669", key: "t17" },
  { icon: "bxl-javascript",  color: "#f59e0b", key: "t18" },
  { icon: "bx-cube-alt",     color: "#7c3aed", key: "t19" },
  { icon: "bx-cylinder",     color: "#dc2626", key: "t20" },
];

// ══════════════════════════════════════════════════════════
// COMPOSANT : CARTE EXPÉRIENCE (Pro + Académique)
// ══════════════════════════════════════════════════════════
const CarteExperience = ({ exp, namespace }) => {
  const { t } = useTranslation("experience");
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: "var(--fond-surface)",
        border:     `1px solid var(--bordure-douce)`,
      }}
    >
      {/* ── Header cliquable ── */}
      <button
        className="w-full text-left p-5 flex items-start gap-4"
        onClick={() => setOpen((v) => !v)}
      >
        {/* Icône */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: `${exp.color}20`, border: `1px solid ${exp.color}35` }}
        >
          <i className={`${exp.icon} text-xl`} style={{ color: exp.color }} />
        </div>

        {/* Infos */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <p className="text-sm font-semibold" style={{ color: "var(--texte-principal)" }}>
              {t(`experience.${namespace}.${exp.key}.name`)}
            </p>
            {/* Badge type */}
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
              style={{ background: `${exp.color}15`, color: exp.color }}
            >
              {t(`experience.types.${exp.type}`, exp.type)}
            </span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: "var(--texte-secondaire)" }}>
            {t(`experience.${namespace}.${exp.key}.org`)}
          </p>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--texte-tertiaire)" }}>
              <i className="bx bx-calendar text-sm" />
              {exp.periode}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--texte-tertiaire)" }}>
              <i className="bx bx-map text-sm" />
              {exp.lieu}
            </span>
          </div>

          {/* Techs preview */}
          {exp.techs.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {exp.techs.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2 py-0.5 rounded-md"
                  style={{ background: "var(--fond-eleve)", color: "var(--texte-tertiaire)" }}
                >
                  {tech}
                </span>
              ))}
              {exp.techs.length > 4 && (
                <span
                  className="text-[10px] px-2 py-0.5 rounded-md"
                  style={{ background: "var(--fond-eleve)", color: "var(--texte-muet)" }}
                >
                  +{exp.techs.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Chevron */}
        <i
          className={`bx bx-chevron-down text-xl transition-transform duration-200 flex-shrink-0 mt-1 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--texte-tertiaire)" }}
        />
      </button>

      {/* ── Détail dépliable ── */}
      {open && (
        <div
          className="px-5 pb-5 flex flex-col gap-4"
          style={{ borderTop: "1px solid var(--bordure-douce)" }}
        >
          {/* Description */}
          {t(`experience.${namespace}.${exp.key}.desc`, "") && (
            <div className="pt-4">
              <p className="text-sm leading-relaxed" style={{ color: "var(--texte-secondaire)" }}>
                {t(`experience.${namespace}.${exp.key}.desc`)}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Missions */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--texte-tertiaire)" }}>
                {t("experience.missions", "Missions")}
              </p>
              <div className="flex flex-col gap-2">
                {exp.missions.map((mKey) => (
                  <div key={mKey} className="flex items-start gap-2">
                    <i className="bx bx-check text-base flex-shrink-0 mt-0.5" style={{ color: exp.color }} />
                    <span className="text-xs leading-relaxed" style={{ color: "var(--texte-secondaire)" }}>
                      {t(`experience.${namespace}.${exp.key}.${mKey.split(".").pop()}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compétences acquises */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--texte-tertiaire)" }}>
                {t("experience.competences", "Compétences acquises")}
              </p>
              <div className="flex flex-col gap-2">
                {exp.competences.map((cKey) => (
                  <div key={cKey} className="flex items-start gap-2">
                    <i className="bx bx-star text-base flex-shrink-0 mt-0.5" style={{ color: exp.color }} />
                    <span className="text-xs leading-relaxed" style={{ color: "var(--texte-secondaire)" }}>
                      {t(`experience.${namespace}.${exp.key}.${cKey.split(".").pop()}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Toutes les techs */}
          {exp.techs.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--texte-tertiaire)" }}>
                {t("experience.technologies", "Technologies")}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.techs.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-lg font-medium"
                    style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════
const Experience = () => {

  const { t } = useTranslation("experience");
  const [onglet, setOnglet] = useState("pro");
  

  const onglets = [
    { key: "pro",   icon: "bx bx-briefcase",      label: t("experience.tabs.pro",   "Professionnelles"), count: experiencesPro.length },
    { key: "acad",  icon: "bx bx-book-open",       label: t("experience.tabs.acad",  "Académiques"),      count: experiencesAcad.length },
    { key: "tech",  icon: "bx bx-code-curly",      label: t("experience.tabs.tech",  "Techniques"),       count: experiencesTech.length },
  ];
  

  const colors = {
    pro:  "#00abf0",
    acad: "#7c3aed",
    tech: "#059669",
  }; 

  return (
    <div className="max-w-4xl mx-auto">

      {/* ── En-tête ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--texte-principal)" }}>
          {t("experience.title", "Expériences")}
        </h1>
        <p className="text-sm" style={{ color: "var(--texte-secondaire)" }}>
          {t("experience.subtitle", "Mon parcours professionnel, académique et technique.")}
        </p>
      </div>

      {/* ── Onglets ── */}
      <div
        className="flex flex-wrap gap-2 mb-6 p-1.5 rounded-xl"
        style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
      >
        {onglets.map((o) => {
          const isActive = onglet === o.key;
          const color = colors[o.key];
          return (
            <button
              key={o.key}
              onClick={() => setOnglet(o.key)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={
                isActive
                  ? { background: `${color}20`, color: color, border: `1px solid ${color}40` }
                  : { color: "var(--texte-tertiaire)", border: "1px solid transparent" }
              }
            >
              <i className={`${o.icon} text-base`} />
              {o.label}
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full"
                style={
                  isActive
                    ? { background: `${color}30`, color: color }
                    : { background: "var(--fond-eleve)", color: "var(--texte-muet)" }
                }
              >
                {o.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Contenu Professionnelles ── */}
      {onglet === "pro" && (
        <div className="flex flex-col gap-4">
          {experiencesPro.map((exp) => (
            <CarteExperience key={exp.key} exp={exp} namespace="pro" />
          ))}
        </div>
      )}

      {/* ── Contenu Académiques ── */}
      {onglet === "acad" && (
        <div className="flex flex-col gap-4">
          {experiencesAcad.map((exp) => (
            <CarteExperience key={exp.key} exp={exp} namespace="acad" />
          ))}
        </div>
      )}

      {/* ── Contenu Techniques ── */}
      {onglet === "tech" && (
        <div
          className="rounded-xl p-6"
          style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
        >
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "var(--texte-tertiaire)" }}>
            {t("experience.techList", "Réalisations & maîtrises techniques")}
          </p>
          <div className="flex flex-col gap-3">
            {experiencesTech.map((item) => (
              <div key={item.key} className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                >
                  <i className={`bx ${item.icon} text-sm`} style={{ color: item.color }} />
                </div>
                <p className="text-sm leading-relaxed pt-1" style={{ color: "var(--texte-secondaire)" }}>
                  {t(`experience.techI.${item.key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;