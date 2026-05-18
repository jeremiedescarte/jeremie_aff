import { useTranslation } from "react-i18next";

const statusBadge = {
  current:  { bg: "bg-[#00abf0]/15", text: "text-[#00abf0]", dot: "bg-[#00abf0] animate-pulse" },
  done:     { bg: "",                 text: "",                dot: "" },
  upcoming: { bg: "",                 text: "",                dot: "" },
};

const YearBlock = ({ year, color, index, t }) => {
  const sc = statusBadge[year.status];

  const badgeStyle = year.status === "done"
    ? { background: "var(--fond-survol)", color: "var(--texte-secondaire)" }
    : year.status === "upcoming"
    ? { background: "var(--fond-survol)", color: "var(--texte-muet)" }
    : {};

  return (
    <div
      className="relative border rounded-xl p-4 transition-all duration-300"
      style={{
        marginLeft: `${index * 20}px`,
        background: year.status === "upcoming" ? "rgba(255,255,255,0.02)" : "var(--fond-surface)",
        borderColor: "var(--bordure-douce)",
        opacity: year.status === "upcoming" ? 0.6 : 1,
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--bordure-moyenne)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--bordure-douce)"}
    >
      {index > 0 && (
        <div className="absolute -left-5 top-6 w-5 h-px" style={{ background: `${color}40` }} />
      )}

      {/* Label + badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="text-sm font-semibold" style={{ color: "var(--texte-principal)" }}>
          {year.label}
        </span>
        <span
          className={`text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${sc.bg} ${sc.text}`}
          style={badgeStyle}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}
            style={
              year.status === "done"
                ? { background: "var(--texte-tertiaire)" }
                : year.status === "upcoming"
                ? { background: "var(--texte-muet)" }
                : {}
            }
          />
          {t(`status.${year.status}`)}
        </span>
      </div>

      {/* Modules */}
      <div className="flex flex-wrap gap-2">
        {year.acquis.map((a) => (
          <span
            key={a}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border"
            style={{
              background: year.status === "upcoming" ? "rgba(255,255,255,0.03)" : `${color}10`,
              borderColor: year.status === "upcoming" ? "var(--bordure-douce)" : `${color}30`,
              color: year.status === "upcoming" ? "var(--texte-muet)" : color,
            }}
          >
            <i
              className="bx bx-check-circle text-sm flex-shrink-0"
              style={{ opacity: year.status === "upcoming" ? 0.4 : 1 }}
            />
            {a}
          </span>
        ))}
      </div>
    </div>
  );
};

const BacBlock = ({ f }) => (
  <div
    className="border rounded-xl p-5 transition-all duration-300 flex flex-wrap gap-4 items-center"
    style={{ background: "var(--fond-surface)", borderColor: "var(--bordure-douce)" }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "var(--bordure-moyenne)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--bordure-douce)"}
  >
    <div className="flex items-center gap-2 text-sm" style={{ color: "var(--texte-secondaire)" }}>
      <i className="bx bx-buildings text-base" />{f.school}
    </div>
    <div className="flex items-center gap-2 text-sm" style={{ color: "var(--texte-secondaire)" }}>
      <i className="bx bx-map text-base" />{f.location}
    </div>
    <div className="flex items-center gap-2 text-sm" style={{ color: "var(--texte-secondaire)" }}>
      <i className="bx bx-calendar text-base" />{f.period}
    </div>
    <div
      className="ml-auto flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg border"
      style={{ background: `${f.color}10`, borderColor: `${f.color}30`, color: f.color }}
    >
      <i className="bx bx-bookmarks text-base" />
      {f.option}
    </div>
  </div>
);

const Formation = () => {
  const { t } = useTranslation("formation");
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const formations = [
    {
      id: "master",
      degree: t("formations.master.degree"),
      option: t("formations.master.option"),
      school: t("formations.master.school"),
      location: t("formations.master.location"),
      period: "2025 – 2027",
      status: "current",
      icon: "bx-award",
      color: "#00abf0",
      years: [
        {
          label: t("formations.master.years.m2.label"),
          status: "upcoming",
          acquis: t("formations.master.years.m2.acquis", { returnObjects: true }),
        },
        {
          label: t("formations.master.years.m1.label"),
          status: "current",
          acquis: t("formations.master.years.m1.acquis", { returnObjects: true }),
        },
      ],
    },
    {
      id: "licence",
      degree: t("formations.licence.degree"),
      option: null,
      school: t("formations.licence.school"),
      location: t("formations.licence.location"),
      period: "2022 – 2025",
      status: "done",
      icon: "bx-book-open",
      color: "#7f77dd",
      years: [
        {
          label: t("l3.title"),
          status: "done",
          acquis: t("l3.modules", { returnObjects: true }).flatMap(m => m.items),
        },
        {
          label: t("l2.title"),
          status: "done",
          acquis: t("l2.modules", { returnObjects: true }).flatMap(m => m.items),
        },
        {
          label: t("l1.title"),
          status: "done",
          acquis: t("l1.modules", { returnObjects: true }).flatMap(m => m.items),
        },
      ],
    },
    {
      id: "bac",
      degree: t("formations.bac.degree"),
      option: t("formations.bac.option"),
      school: t("formations.bac.school"),
      location: t("formations.bac.location"),
      period: "2022",
      status: "done",
      icon: "bx-graduation",
      color: "#1d9e75",
      years: [],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">

      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--texte-principal)" }}>
          {t("title")}
        </h1>
        <p className="text-sm" style={{ color: "var(--texte-secondaire)" }}>
          {t("subtitle")}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[27px] top-0 bottom-0 w-px" style={{ background: "var(--bordure-douce)" }} />

        <div className="flex flex-col gap-8">
          {formations.map((f) => (
            <div key={f.id} className="relative flex gap-5 group">

              {/* Icône */}
              <div
                className="hidden lg:block relative z-10 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 border transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${f.color}15`, borderColor: `${f.color}40` }}
              >
                <i className={`bx ${f.icon} text-2xl`} style={{ color: f.color }} />
                {f.status === "current" && (
                  <span
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 animate-pulse"
                    style={{ background: f.color, borderColor: "var(--fond-base)" }}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">

                {/* Header diplôme */}
                <div
                  className="border rounded-xl p-5 mb-3"
                  style={{ background: "var(--fond-surface)", borderColor: "var(--bordure-douce)" }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-base font-semibold" style={{ color: "var(--texte-principal)" }}>
                        {f.degree}
                      </h3>
                      {f.option && f.id !== "bac" && (
                        <p className="text-sm mt-0.5" style={{ color: f.color }}>{f.option}</p>
                      )}
                    </div>
                    {/* Badge status */}
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5 flex-shrink-0"
                      style={
                        f.status === "current"
                          ? { background: "#00abf0" + "25", color: "#00abf0" }
                          : { background: "var(--fond-survol)", color: "var(--texte-secondaire)" }
                      }
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${f.status === "current" ? "animate-pulse" : ""}`}
                        style={{
                          background: f.status === "current" ? "#00abf0" : "var(--texte-tertiaire)"
                        }}
                      />
                      {t(`status.${f.status}`)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <span className="flex items-center gap-1.5 text-sm" style={{ color: "var(--texte-secondaire)" }}>
                      <i className="bx bx-buildings text-base" />{f.school}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm" style={{ color: "var(--texte-secondaire)" }}>
                      <i className="bx bx-map text-base" />{f.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm" style={{ color: "var(--texte-secondaire)" }}>
                      <i className="bx bx-calendar text-base" />{f.period}
                    </span>
                  </div>
                </div>

                {/* Escalier années */}
                {f.years.length > 0 && (
                  <div
                    className="flex flex-col gap-3 pl-4 border-l-2 border-dashed"
                    style={{ borderColor: `${f.color}30` }}
                  >
                    {f.years.map((year, i) => (
                      <YearBlock key={year.label} year={year} color={f.color} index={i} t={t} />
                    ))}
                  </div>
                )}

                {/* Baccalauréat */}
                {f.id === "bac" && (
                  <div className="pl-4 border-l-2 border-dashed" style={{ borderColor: `${f.color}30` }}>
                    <BacBlock f={f} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bannière objectif */}
      <div
        className="mt-8 rounded-xl p-5 flex items-center gap-4 border"
        style={{ background: "var(--accent-fond)", borderColor: "var(--accent-bordure)" }}
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--accent-fond)" }}
        >
          <i className="bx bx-target-lock text-xl" style={{ color: "var(--accent)" }} />
        </div>
        <div>
          <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--texte-principal)" }}>
            {t("goal.title")}
          </p>
          <p className="text-sm" style={{ color: "var(--texte-secondaire)" }}>
            {t("goal.text")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Formation;