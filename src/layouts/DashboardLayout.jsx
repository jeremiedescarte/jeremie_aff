import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ToggleBar from "../components/ToggleBar";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const links = [
    { to: "competences",    icon: "bx bx-brain",      label: t("nav.competences") },
    { to: "formation",      icon: "bx bx-book-open",   label: t("nav.formation") },
    { to: "experience",     icon: "bx bx-briefcase",   label: t("nav.experience") },
    { to: "projets",        icon: "bx bx-rocket",      label: t("nav.projets") },
    { to: "certifications", icon: "bx bx-award",       label: t("nav.certifications") },
  ];

  const linksBottom = [
    { to: "chat",    icon: "bx bx-bot",      label: t("nav.chat"),    badge: "IA" },
    { to: "contact", icon: "bx bx-envelope", label: t("nav.contact") },
    { to: "cv",      icon: "bx bx-file",     label: t("nav.cv") },
    { to: "moi",     icon: "bx bx-user",     label: t("nav.moi") },
  ];

  const pageTitles = {
    "/dashboard/competences":    t("nav.competences"),
    "/dashboard/formation":      t("nav.formation"),
    "/dashboard/experience":     t("nav.experience"),
    "/dashboard/projets":        t("nav.projets"),
    "/dashboard/certifications": t("nav.certifications"),
    "/dashboard/chat":           t("nav.chat"),
    "/dashboard/contact":        t("nav.contact"),
    "/dashboard/cv":             t("nav.cv"),
    "/dashboard/moi":             t("nav.moi"),

  };

  const pageIcons = {
    "/dashboard/competences":    "bx bx-brain",
    "/dashboard/formation":      "bx bx-book-open",
    "/dashboard/experience":     "bx bx-briefcase",
    "/dashboard/projets":        "bx bx-rocket",
    "/dashboard/certifications": "bx bx-award",
    "/dashboard/chat":           "bx bx-bot",
    "/dashboard/contact":        "bx bx-envelope",
    "/dashboard/cv":             "bx bx-file",
    "/dashboard/moi":             "bx bx-user",
  };

  const currentTitle = pageTitles[location.pathname] || "Dashboard";
  const currentIcon  = pageIcons[location.pathname]  || "bx bx-grid-alt";

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--fond-base)", color: "var(--texte-principal)" }}
    >

      {/* ── Overlay mobile ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════ */}
      <aside
        className={`
          fixed lg:relative z-50
          w-[220px] min-w-[220px] h-full
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
        style={{
          background:   "var(--fond-surface)",
          borderRight:  "1px solid var(--bordure-douce)",
        }}
      >

        {/* ── Logo / Avatar ── */}
        <div
          className="flex items-center gap-3 px-4 py-5"
          style={{ borderBottom: "1px solid var(--bordure-douce)" }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
            style={{ background: "var(--accent)", color: "var(--accent-texte)" }}
          >
            JA
          </div>

          <div>
            <p
              className="text-sm font-semibold leading-tight"
              style={{ color: "var(--texte-principal)" }}
            >
              Enagnon Jeremie AFFODO
            </p>
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5">

          {/* Liens principaux */}
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
              style={({ isActive }) =>
                isActive
                  ? { background: "var(--accent-fond)", color: "var(--accent)" }
                  : { color: "var(--texte-secondaire)" }
              }
            >
              <i className={`${l.icon} text-lg`} />
              {l.label}
            </NavLink>
          ))}

          {/* Séparateur */}
          <div
            className="my-2"
            style={{ borderTop: "1px solid var(--bordure-douce)" }}
          />

          {/* Liens secondaires */}
          {linksBottom.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
              style={({ isActive }) =>
                isActive
                  ? { background: "var(--accent-fond)", color: "var(--accent)" }
                  : { color: "var(--texte-secondaire)" }
              }
            >
              <i className={`${l.icon} text-lg`} />
              {l.label}

              {l.badge && (
                <span
                  className="ml-auto text-[11px] px-2 py-0.5 rounded-full"
                  style={{ background: "var(--accent-fond)", color: "var(--accent)" }}
                >
                  {l.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ── Retour accueil ── */}
        <div
          className="px-2 py-3"
          style={{ borderTop: "1px solid var(--bordure-douce)" }}
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all w-full"
            style={{ color: "var(--texte-muet)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--fond-survol)";
              e.currentTarget.style.color      = "var(--texte-secondaire)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color      = "var(--texte-muet)";
            }}
          >
            <i className="bx bx-home text-lg" />
            Retour accueil
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════════
          CONTENU PRINCIPAL
      ══════════════════════════════════════ */}
      <div className="flex flex-col flex-1 overflow-hidden w-full">

        {/* ── Topbar ── */}
        <header
          className="h-14 flex items-center px-4 lg:px-6 gap-3 flex-shrink-0"
          style={{
            background:   "var(--fond-surface)",
            borderBottom: "1px solid var(--bordure-douce)",
          }}
        >
          {/* Bouton menu mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-2xl transition-colors"
            style={{ color: "var(--texte-principal)" }}
          >
            <i className="bx bx-menu" />
          </button>

          {/* Icône + titre de la page courante */}
          <i
            className={`${currentIcon} text-xl`}
            style={{ color: "var(--accent)" }}
          />
          <span
            className="text-sm font-medium"
            style={{ color: "var(--texte-principal)" }}
          >
            {currentTitle}
          </span>

          {/* Toggle thème + langue (ToggleBar gère déjà les deux) */}
          <div className="ml-auto">
            <ToggleBar disposition="ligne" />
          </div>
        </header>

        {/* ── Page ── */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;