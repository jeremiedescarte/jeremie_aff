import MainLayout from "../layouts/MainLayout";
import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.css";


const Home = () => {
     const { t } = useTranslation();
  return (

    <section className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-[10%] pt-28 pb-16 md:pt-0 gap-10">

      {/* ── BLOC 1 : Contenu texte (gauche) ── */}
      <div className="flex flex-col items-start mt-28 max-w-2xl w-full">

        {/* Titre */}
        <h1 className="text-2xl md:text-4xl lg:text-[40px] lg:font-bold lg:leading-[1.2] leading-tight mb-3">
         {t('home.greeting')} Enagnon Jeremie AFFODO
        </h1>

        {/* Sous-titre */}
        <h3 className="text-xl sm:text-2xl font-bold text-[#00abf0] mb-5">
          {t('home.role')}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#ededed]/80 mb-8 font-medium leading-relaxed">
        {t('home.description')}
        </p>

        {/* ── BLOC 2 : Boutons CTA ── */}
        <div className="btn-box flex w-[345px] h-[45px] gap-4 flex-wrap mb-10 space-x-3">

          {/* Bouton 1 — Hire Me (fond plein) */}
          <a href="#Contact"
            className="relative px-7 py-3 bg-[#00abf0] border-2 border-[#00abf0] font-semibold rounded-lg overflow-hidden group transition-all duration-300 hover:text-[#00abf0]">
            <span className="absolute inset-0 bg-[#081b29] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0" />
            <span className="relative z-10">Hire Me</span>
          </a>

          {/* Bouton 2 — Let's Talk (contour) */}
          <a href="#Contact"
            className="relative px-7 py-3 bg-transparent border-2 border-[#00abf0] text-[#00abf0] font-semibold rounded-lg overflow-hidden group transition-all duration-300 hover:text-[#081b29]">
            <span className="absolute inset-0 bg-[#00abf0] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0" />
            <span className="relative z-10">Let's Talk</span>
          </a>

        </div>

        {/* ── BLOC 3 : Icônes réseaux sociaux ── */}
        <div className="flex gap-4">
          {[
            { icon: "bxl-facebook",  href: "#" },
            { icon: "bxl-instagram", href: "#" },
            { icon: "bxl-linkedin",  href: "#" },
          ].map((s) => (
            <a key={s.icon} href={s.href}
              className="relative w-10 h-10 flex items-center justify-center border-2 border-[#00abf0] rounded-full text-[#00abf0] overflow-hidden group transition-all duration-300 hover:text-[#081b29]">
              <span className="absolute inset-0 bg-[#00abf0] scale-0 group-hover:scale-100 rounded-full transition-transform duration-300 z-0" />
              <i className={`bx ${s.icon} text-lg relative z-10`} />
            </a>
          ))}
        </div>

      </div>

      {/* ── BLOC 4 : Image de profil (droite) ── */}
      <div className="flex-shrink-0 mt-10 top-[40px] left-[30px] w-56 h-56 sm:w-72 sm:h-72 lg:w-[340px] lg:h-[450px] relative">
        {/* Halo lumineux derrière l'image */}
        <div className="absolute inset-0 rounded-full bg-[#00abf0]/20 blur-2xl scale-110" />
        <img
          src="/profile.png"
          alt="Jeremie AFFODO"
          className="relative w-full h-full object-cover rounded-full border-4 border-[#00abf0] shadow-[0_0_40px_#00abf0]"
          style={{
            maskImage: "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>
    </section>

  );
};

export default Home;
