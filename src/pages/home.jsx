import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ToggleBar from "../components/ToggleBar";

// ══════════════════════════════════════════════════════════
// NAVBAR HOME
// ══════════════════════════════════════════════════════════
const NavbarHome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header
      className="fixed top-0 left-0 w-full z-25 flex items-center justify-between px-6 md:px-[10%] py-4"
      style={{
        background:     "var(--fond-surface)",
        borderBottom:   "1px solid var(--bordure-douce)",
        backdropFilter: "blur(12px)",
      }}
    >
      <a
        href="#"
        className="text-xl md:text-2xl font-bold transition-colors duration-300"
        style={{ color: "var(--texte-principal)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--texte-principal)")}
      >
        AFFODO<span style={{ color: "var(--accent)" }}> Services</span>
      </a>

      <div className="flex items-center gap-3">
        <ToggleBar disposition="ligne" />
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-[1.03]"
          style={{ background: "var(--accent)", color: "var(--accent-texte)" }}
        >
          <i className="bx bx-grid-alt text-base" />
          <span className="hidden sm:inline">{t("home.nav.dashboard", "Dashboard")}</span>
        </button>
      </div>
    </header>
  );
};

// ══════════════════════════════════════════════════════════
// PAGE HOME
// ══════════════════════════════════════════════════════════
const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const heroRef  = useRef(null);

  // ── Desktop uniquement : wheel → dashboard ──
  useEffect(() => {
    const isMobile = () => window.innerWidth < 768;
    let timeout = null;
    const handleWheel = (e) => {
      if (isMobile()) return;
      if (e.deltaY > 40) {
        clearTimeout(timeout);
        timeout = setTimeout(() => navigate("/dashboard"), 150);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeout);
    };
  }, [navigate]);

  const socials = [
    { icon: "bxl-linkedin",  href: "https://linkedin.com/in/jeremie-affodo", label: "LinkedIn"  },
    { icon: "bxl-github",    href: "https://github.com/jeremiedescarte",      label: "GitHub"    },
    { icon: "bxl-instagram", href: "#",                                        label: "Instagram" },
  ];

  return (
    /*
      Mobile  : scroll libre, hauteur auto
      Desktop : page fixe h-screen overflow-hidden, wheel → dashboard
    */
    <div
      className="min-h-screen md:h-screen md:overflow-hidden"
      style={{ background: "var(--fond-base)", color: "var(--texte-principal)" }}
    >
      <NavbarHome />

      {/* ══════════════════════════════════════════════
          SECTION HERO
      ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="
          min-h-screen md:h-screen md:overflow-hidden
          flex flex-col md:flex-row items-center justify-between
          px-6 md:px-[10%]
          pt-24 pb-16
          md:pt-0 md:pb-0
          gap-8 md:gap-10
        "
      >

        {/* ── Image de profil (haut sur mobile, droite sur desktop) ── */}
        <div
          className="
            flex-shrink-0 order-first md:order-last
            w-36 h-36
            sm:w-48 sm:h-48
            md:w-64 md:h-64
            lg:w-[280px] lg:h-[360px]
            relative mt-4 md:mt-0
          "
        >
          <div
            className="absolute inset-0 rounded-full blur-2xl scale-110 opacity-30"
            style={{ background: "var(--accent)" }}
          />
          <img
            src="/profile.png"
            alt="Jeremie AFFODO"
            className="relative w-full h-full object-cover rounded-full"
            style={{
              border:          "4px solid var(--accent)",
              boxShadow:       "0 0 40px var(--accent)",
              maskImage:       "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>

        {/* ── Bloc texte ── */}
        <div className="flex flex-col items-start w-full max-w-xl order-last md:order-first">

          {/* Titre */}
          <h1
            className="text-2xl sm:text-3xl md:text-3xl lg:text-[38px] font-bold leading-tight mb-2"
            style={{ color: "var(--texte-principal)" }}
          >
            {t("home.greeting")}{" "}
            <span style={{ color: "var(--accent)" }}>Enagnon Jeremie AFFODO</span>
          </h1>

          {/* Rôle */}
          <h3
            className="text-base sm:text-lg md:text-xl font-bold mb-3"
            style={{ color: "var(--accent)" }}
          >
            {t("home.role")}
          </h3>

          {/* Description */}
          <p
            className="text-sm mb-3 leading-relaxed"
            style={{ color: "var(--texte-secondaire)" }}
          >
            {t("home.description")}
          </p>

          {/* Badge disponible */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5"
            style={{
              background: "var(--accent-fond)",
              border:     "1px solid var(--accent-bordure)",
              color:      "var(--accent)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            {t("home.badge", "Disponible · Open to work")}
          </div>

          {/* Boutons CTA */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Link
              to="/dashboard/contact"
              className="px-6 py-2.5 font-semibold rounded-lg transition-all duration-300 text-sm"
              style={{ background: "var(--accent)", color: "var(--accent-texte)", border: "2px solid var(--accent)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)";  e.currentTarget.style.color = "var(--accent-texte)"; }}
            >
              {t("home.cta.hire", "Hire Me")}
            </Link>

            <Link
              to="/dashboard/chat"
              className="px-6 py-2.5 font-semibold rounded-lg transition-all duration-300 text-sm"
              style={{ background: "transparent", color: "var(--accent)", border: "2px solid var(--accent)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)";  e.currentTarget.style.color = "var(--accent-texte)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent";    e.currentTarget.style.color = "var(--accent)"; }}
            >
              {t("home.cta.talk", "Let's Talk")}
            </Link>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.icon}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                style={{ border: "2px solid var(--accent)", color: "var(--accent)", background: "transparent" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--accent-texte)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent";   e.currentTarget.style.color = "var(--accent)"; }}
              >
                <i className={`bx ${s.icon} text-base`} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INDICATEUR SCROLL — desktop uniquement
      ══════════════════════════════════════════════ */}
      <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-40 animate-bounce">
        <p className="text-xs font-medium" style={{ color: "var(--texte-tertiaire)" }}>
          {t("home.scrollHint", "Scroll pour explorer")}
        </p>
        <div
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-1.5"
          style={{ borderColor: "var(--accent)" }}
        >
          <div className="w-1 h-2.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
        </div>
        <i className="bx bx-chevron-down text-xl" style={{ color: "var(--accent)" }} />
      </div>

      {/* ── Bouton dashboard mobile (en bas) ── */}
      <div className="md:hidden flex justify-center pb-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{ background: "var(--accent)", color: "var(--accent-texte)" }}
        >
          <i className="bx bx-grid-alt" />
          {t("home.nav.dashboard", "Dashboard")}
          <i className="bx bx-right-arrow-alt" />
        </button>
      </div>
    </div>
  );
};

export default Home;