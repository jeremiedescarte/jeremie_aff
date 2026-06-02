import { useTranslation } from "react-i18next";

const Moi = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: "bx bx-code-alt",  value: "3+",  label: t("about.stat.years",    "ans d'expérience") },
    { icon: "bx bx-rocket",    value: "10+", label: t("about.stat.projects",  "projets réalisés") },
    { icon: "bx bx-award",     value: "5+",  label: t("about.stat.certs",     "certifications")   },
    { icon: "bx bx-globe",     value: "2",   label: t("about.stat.langs",     "langues")          },
  ];

  const values = [
    { icon: "bx bx-bulb",        label: t("about.value.curiosity",  "Curiosité"),    desc: t("about.value.curiosity.desc",  "J'apprends en permanence, chaque problème est une opportunité.") },
    { icon: "bx bx-check-shield", label: t("about.value.rigor",     "Rigueur"),      desc: t("about.value.rigor.desc",      "Code propre, architecture solide, résultats fiables.")           },
    { icon: "bx bx-group",        label: t("about.value.collab",    "Collaboration"), desc: t("about.value.collab.desc",    "Les meilleurs projets naissent d'une bonne équipe.")              },
    { icon: "bx bx-trending-up",  label: t("about.value.ambition",  "Ambition"),     desc: t("about.value.ambition.desc",   "Viser l'international, toujours aller plus loin.")               },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-5">

      {/* ══════════════════════════════════════
          BLOC PRINCIPAL — Photo + Bio
      ══════════════════════════════════════ */}
      <div
        className="rounded-xl p-5 md:p-6 flex flex-col md:flex-row gap-6 items-center md:items-start"
        style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
      >
        {/* Photo */}
        <div className="flex-shrink-0 relative w-28 h-28 md:w-32 md:h-32">
          <div
            className="absolute inset-0 rounded-full blur-xl scale-110 opacity-25"
            style={{ background: "var(--accent)" }}
          />
          <img
            src="/profile.png"
            alt="Jeremie AFFODO"
            className="relative w-full h-full object-cover rounded-full"
            style={{ border: "3px solid var(--accent)", boxShadow: "0 0 24px var(--accent)" }}
          />
        </div>

        {/* Texte */}
        <div className="flex-1 text-center md:text-left">
          <h1
            className="text-xl md:text-2xl font-bold mb-1"
            style={{ color: "var(--texte-principal)" }}
          >
            Enagnon Jeremie AFFODO
          </h1>
          <p className="text-sm font-medium mb-3" style={{ color: "var(--accent)" }}>
            {t("about.role", "Full Stack Developer · Data Science · Cybersecurity")}
          </p>

          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--texte-secondaire)" }}>
            {t("about.bio1", "Originaire de Côte d'Ivoire, je suis actuellement étudiant en Master Génie des Systèmes Informatiques, spécialité Data Science & Systèmes d'Information à SUP MTI Beni Mellal, Maroc. Mon parcours m'a amené à développer une double compétence technique : le développement Full Stack d'un côté, la Data Science et la Cybersécurité de l'autre.")}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--texte-secondaire)" }}>
            {t("about.bio2", "Durant mon stage chez US2i (Beni Mellal), j'ai travaillé sur la maintenance système, la coordination de projets et le développement d'applications avec Laravel et React. Mon objectif est de rejoindre une équipe internationale après l'obtention de mon diplôme et de contribuer à des projets à fort impact.")}
          </p>

          {/* Badge dispo */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mt-4"
            style={{ background: "var(--accent-fond)", border: "1px solid var(--accent-bordure)", color: "var(--accent)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            {t("home.badge", "Disponible · Open to work")}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4 flex flex-col items-center gap-1 text-center"
            style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
          >
            <i className={`${s.icon} text-2xl`} style={{ color: "var(--accent)" }} />
            <span className="text-xl font-bold" style={{ color: "var(--texte-principal)" }}>{s.value}</span>
            <span className="text-xs" style={{ color: "var(--texte-tertiaire)" }}>{s.label}</span>
          </div>
        ))}
      </div> */}

      {/* ══════════════════════════════════════
          MON HISTOIRE
      ══════════════════════════════════════ */}
      <div
        className="rounded-xl p-5 md:p-6"
        style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
      >
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--texte-tertiaire)" }}>
          {t("about.story.title", "Mon histoire")}
        </h2>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--texte-secondaire)" }}>
          {t("about.story.p1", "Tout a commencé par une passion pour la résolution de problèmes. Dès mes premières lignes de code, j'ai compris que l'informatique était bien plus qu'une discipline technique — c'est un outil pour transformer des idées en réalités concrètes.")}
        </p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--texte-secondaire)" }}>
          {t("about.story.p2", "Après mon Baccalauréat en Côte d'Ivoire, j'ai poursuivi mes études au Maroc à SUP MTI, où j'ai obtenu ma Licence en Génie Informatique avant d'intégrer le Master. Cette expérience m'a non seulement formé techniquement, mais aussi appris à travailler dans des environnements multiculturels et exigeants.")}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--texte-secondaire)" }}>
          {t("about.story.p3", "Aujourd'hui, je construis ce portfolio comme une vitrine de mes compétences et de ma trajectoire, avec un objectif clair : décrocher une opportunité internationale et contribuer à des projets qui comptent vraiment.")}
        </p>
      </div>

      {/* ══════════════════════════════════════
          VALEURS
      ══════════════════════════════════════ */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-3 px-1" style={{ color: "var(--texte-tertiaire)" }}>
          {t("about.values.title", "Mes valeurs")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {values.map((v) => (
            <div
              key={v.label}
              className="rounded-xl p-4 flex items-start gap-3"
              style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--accent-fond)", border: "1px solid var(--accent-bordure)" }}
              >
                <i className={`${v.icon} text-lg`} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--texte-principal)" }}>{v.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--texte-tertiaire)" }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Moi;