import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Overview = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sections = [
    { to: "competences",    icon: "bx bx-brain",      label: t("nav.competences"),    description: t("overview.desc.competences") },
    { to: "formation",      icon: "bx bx-book-open",   label: t("nav.formation"),      description: t("overview.desc.formation")   },
    { to: "experience",     icon: "bx bx-briefcase",   label: t("nav.experience"),     description: t("overview.desc.experience")  },
    { to: "projets",        icon: "bx bx-rocket",      label: t("nav.projets"),        description: t("overview.desc.projets")     },
    { to: "certifications", icon: "bx bx-award",       label: t("nav.certifications"), description: t("overview.desc.certifications") },
    { to: "chat",           icon: "bx bx-bot",         label: t("nav.chat"),           description: t("overview.desc.chat"),  badge: "IA" },
    { to: "contact",        icon: "bx bx-envelope",    label: t("nav.contact"),        description: t("overview.desc.contact") },
    { to: "cv",             icon: "bx bx-file",        label: t("nav.cv"),             description: t("overview.desc.cv")      },
  ];

  const stats = [
    { icon: "bx bx-code-alt", value: "3+", label: t("overview.stat.years")    },
    { icon: "bx bx-rocket",   value: "10+", label: t("overview.stat.projects") },
    { icon: "bx bx-award",    value: "5+",  label: t("overview.stat.certs")    },
    { icon: "bx bx-globe",    value: "2",   label: t("overview.stat.langs")    },
  ];

  return (
    <div className="h-full flex flex-col gap-4 max-w-5xl mx-auto">

      {/* ══════════════════════════════════════
          HEADER
      ══════════════════════════════════════ */}
      <div
        className="rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center gap-4"
        style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
      >
        {/* Avatar + texte */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
            style={{ background: "var(--accent)", color: "var(--accent-texte)" }}
          >
            JA
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold leading-tight truncate" style={{ color: "var(--texte-principal)" }}>
              {t("overview.title")}
            </h1>
            <p className="text-xs mt-0.5 truncate" style={{ color: "var(--texte-tertiaire)" }}>
              {t("overview.subtitle")}
            </p>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap"></div>
              <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
              style={{ background: "var(--accent-fond)", border: "1px solid var(--accent-bordure)" }}
            >
            <p className="text-xl font-bold" style={{ color: "var(--accent)" }}>
              Enagnon Jeremie AFFODO 
            </p>
        </div> 

        {/* //Stats//
        <div className="flex gap-3 flex-wrap">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
              style={{ background: "var(--accent-fond)", border: "1px solid var(--accent-bordure)" }}
            >
              <i className={`${s.icon} text-sm`} style={{ color: "var(--accent)" }} />
              <span className="font-bold" style={{ color: "var(--accent)" }}>{s.value}</span>
              <span style={{ color: "var(--texte-secondaire)" }}>{s.label}</span>
            </div>
          ))}
        </div> */}
      </div>

      {/* Description courte */}
      <p className="text-xs leading-relaxed px-1" style={{ color: "var(--texte-tertiaire)" }}>
        {t("overview.intro")}
      </p>

      {/* ══════════════════════════════════════
          GRILLE
      ══════════════════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 flex-1">
        {sections.map((s) => (
          <button
            key={s.to}
            onClick={() => navigate(s.to)}
            className="group text-left rounded-xl p-4 transition-all duration-200 hover:scale-[1.02] flex flex-col"
            style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent-bordure)";
              e.currentTarget.style.background  = "var(--accent-fond)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--bordure-douce)";
              e.currentTarget.style.background  = "var(--fond-surface)";
            }}
          >
            {/* Icône + badge */}
            <div className="flex items-center justify-between mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "var(--accent-fond)", border: "1px solid var(--accent-bordure)" }}
              >
                <i className={`${s.icon} text-lg`} style={{ color: "var(--accent)" }} />
              </div>
              {s.badge && (
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                  style={{ background: "var(--accent-fond)", color: "var(--accent)", border: "1px solid var(--accent-bordure)" }}
                >
                  {s.badge}
                </span>
              )}
            </div>

            {/* Label */}
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--texte-principal)" }}>
              {s.label}
            </p>

            {/* Description */}
            <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--texte-tertiaire)" }}>
              {s.description}
            </p>

            {/* Flèche */}
            <div className="flex justify-end mt-2">
              <i
                className="bx bx-right-arrow-alt text-base transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: "var(--accent)" }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Overview;