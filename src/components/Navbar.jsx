import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // détecte la page active
  const { t, i18n } = useTranslation();  //  hook de traduction   

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   const navLinks = [
    { label: t('nav2.home'),      to: "/",          isLink: true  },
    { label: t('nav2.about'),     to: "/about",     isLink: true  },
    { label: t('nav2.services'),  href: "#Services", isLink: false },
    { label: t('nav2.portfolio'), to: "/portfolio", isLink: true  },
    { label: t('nav2.contact'),   href: "/contact",  isLink: false },
  ];

  return (
<header
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-[10%] py-4 flex justify-between items-center
    ${scrolled ? "" : "bg-transparent"}`}
>

      {/* Logo */}
      <a href="#" className="text-xl md:text-4xl font-bold text-[#ededed] hover:text-[#00abf0] transition-colors duration-300">
        AFFODO-ServiceS
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) =>
          link.isLink ? (
            <Link key={link.label} to={link.to}
              className={`text-base font-medium transition-colors duration-300 hover:text-[#00abf0]
                ${location.pathname === link.to ? "text-[#00abf0]" : "text-[#ededed]"}`}>
              {link.label}
            </Link>
          ) : (
            <a key={link.label} href={link.href}
              className="text-base font-medium text-[#ededed] hover:text-[#00abf0] transition-colors duration-300">
              {link.label}
            </a>
          )
        )}
        {/* ── Switcher de langue (desktop) ── */}
        <button onClick={changeLanguage.bind(null, i18n.language === "fr" ? "en" : "fr")}
          className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#00abf0] rounded-full text-[#00abf0] text-sm font-semibold hover:bg-[#00abf0] hover:text-[#081b29] transition-all duration-300">
          🌐 {i18n.language === "en" ? "FR" : "EN"}
        </button>
      </nav>

      {/* Burger */}
      <button className="md:hidden flex flex-col gap-[5px] cursor-pointer z-50"
        onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span className={`block w-6 h-[2px] bg-[#00abf0] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
        <span className={`block w-6 h-[2px] bg-[#00abf0] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-[2px] bg-[#00abf0] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
      </button>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#081b29]/95 backdrop-blur-md flex flex-col items-center justify-center gap-10 transition-all duration-500 md:hidden
        ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {navLinks.map((link) =>
          link.isLink ? (
            <Link key={link.label} to={link.to} onClick={() => setMenuOpen(false)}
              className={`text-2xl font-semibold transition-colors duration-300 hover:text-[#00abf0]
                ${location.pathname === link.to ? "text-[#00abf0]" : "text-[#ededed]"}`}>
              {link.label}
            </Link>
          ) : (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-[#ededed] hover:text-[#00abf0] transition-colors duration-300">
              {link.label}
            </a>
          )
        )}
                {/* ── Switcher de langue (mobile) ── */}
        <button onClick={() => { changeLanguage(i18n.language === "fr" ? "en" : "fr"); setMenuOpen(false); }}
          className="flex items-center gap-2 px-4 py-2 border-2 border-[#00abf0] rounded-full text-[#00abf0] text-lg font-semibold hover:bg-[#00abf0] hover:text-[#081b29] transition-all duration-300">
          🌐 {i18n.language === "en" ? "FR" : "EN"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;