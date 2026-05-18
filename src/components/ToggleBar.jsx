// ============================================================
// src/components/ToggleBar.jsx
//
// Rôle : Afficher les boutons pour changer le thème (sombre/clair)
//        et la langue (FR/EN).
//
// Props :
//   disposition : "ligne"   → boutons côte à côte (pour la topbar)
//                 "colonne" → boutons empilés     (pour la sidebar)
//
// Exemples d'utilisation :
//   <ToggleBar disposition="ligne" />   ← dans la topbar
//   <ToggleBar disposition="colonne" /> ← dans la sidebar
// ============================================================

import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const ToggleBar = ({ disposition = "ligne" }) => {
  // Récupère le thème actuel et la fonction pour le changer
  const { theme, basculerTheme } = useTheme();

  // Récupère la fonction de traduction et l'objet i18n (pour changer la langue)
  const { t, i18n } = useTranslation();

  // Est-ce qu'on est en mode sombre ?
  const estSombre = theme === "sombre";

  // Langue actuelle (les 2 premiers caractères : "fr" ou "en")
  const langue = i18n.language?.slice(0, 2) || "fr";

  // Bascule entre français et anglais
  const basculerLangue = () =>
    i18n.changeLanguage(langue === "fr" ? "en" : "fr");

  // ── Styles communs aux boutons ──
  const styleBouton = {
    background : "var(--fond-survol)",
    color      : "var(--texte-secondaire)",
    border     : "1px solid var(--bordure-douce)",
  };

  // ── DISPOSITION EN COLONNE (sidebar) ──
  if (disposition === "colonne") {
    return (
      <div className="flex flex-col gap-2">

        {/* Bouton thème */}
        <button
          onClick={basculerTheme}
          title={estSombre ? t("commun.theme.clair") : t("commun.theme.sombre")}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm w-full transition-colors"
          style={styleBouton}
        >
          {/* Icône soleil si sombre (on peut passer au clair), lune si clair */}
          <i
            className={`bx ${estSombre ? "bx-sun" : "bx-moon"} text-lg`}
            style={{ color: "var(--accent)" }}
          />
          <span>{estSombre ? t("commun.theme.clair") : t("commun.theme.sombre")}</span>
        </button>

        {/* Bouton langue */}
        <button
          onClick={basculerLangue}
          title="Changer la langue / Switch language"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm w-full transition-colors"
          style={styleBouton}
        >
          <i className="bx bx-globe text-lg" style={{ color: "var(--accent)" }} />
          {/* Affiche la langue VERS laquelle on peut basculer */}
          <span>{langue === "fr" ? t("commun.langue.en") : t("commun.langue.fr")}</span>
        </button>

      </div>
    );
  }

  // ── DISPOSITION EN LIGNE (topbar) ──
  return (
    <div className="flex items-center gap-1.5">

      {/* Bouton langue compact */}
      <button
        onClick={basculerLangue}
        title="Changer la langue / Switch language"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
        style={styleBouton}
      >
        <i className="bx bx-globe text-sm" />
        {/* Affiche la langue ACTIVE (FR ou EN) */}
        {langue === "fr" ? "FR" : "EN"}
      </button>

      {/* Séparateur vertical */}
      <div
        className="w-px h-4"
        style={{ background: "var(--bordure-douce)" }}
      />

      {/* Bouton thème (icône seule) */}
      <button
        onClick={basculerTheme}
        title={estSombre ? t("commun.theme.clair") : t("commun.theme.sombre")}
        className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
        style={styleBouton}
      >
        <i className={`bx ${estSombre ? "bx-sun" : "bx-moon"} text-base`} />
      </button>

    </div>
  );
};

export default ToggleBar;