// ============================================================
// src/context/ThemeContext.jsx
//
// Rôle : Gérer le thème de l'application (sombre / clair).
//        Ce fichier crée un "contexte" React qui permet à
//        n'importe quel composant de savoir quel thème est actif
//        et de le changer sans passer des props partout.
//
// Comment ça marche :
//   1. Au démarrage, on lit le thème sauvegardé dans localStorage
//      (si l'utilisateur avait déjà choisi un thème avant).
//   2. On applique le thème sur la balise <html> via data-theme="..."
//      Ce sont les variables CSS dans theme.css qui font le vrai
//      changement de couleurs.
//   3. Tout composant qui a besoin du thème utilise useTheme().
// ============================================================

import { createContext, useContext, useEffect, useState } from "react";

// 1. Créer le contexte (la "boîte" qui va contenir le thème)
const ContexteTheme = createContext();

// 2. Le Provider : il entoure toute l'application dans main.jsx
//    et rend le thème accessible partout
export const FournisseurTheme = ({ children }) => {

  // Lire le thème sauvegardé, sinon "sombre" par défaut
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "sombre"
  );

  // Chaque fois que le thème change :
  // - on met à jour l'attribut data-theme sur <html>
  // - on sauvegarde dans localStorage pour s'en souvenir
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Fonction pour basculer entre sombre et clair
  const basculerTheme = () =>
    setTheme((actuel) => (actuel === "sombre" ? "clair" : "sombre"));

  return (
    <ContexteTheme.Provider value={{ theme, basculerTheme }}>
      {children}
    </ContexteTheme.Provider>
  );
};

// 3. Hook personnalisé : permet d'utiliser le thème facilement
//    dans n'importe quel composant avec : const { theme, basculerTheme } = useTheme();
export const useTheme = () => useContext(ContexteTheme);