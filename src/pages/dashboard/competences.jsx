import { useState } from "react";
import { useTranslation } from "react-i18next";

// ══════════════════════════════════════════════════════════
// DONNÉES DES COMPÉTENCES
// ══════════════════════════════════════════════════════════
const categories = [
  {
    key: "web",
    icon: "bx bx-code-alt",
    color: "#00abf0",
    skills: [
      { name: "HTML5",             niveau: 90, icon: "bxl-html5" },
      { name: "CSS3",              niveau: 85, icon: "bxl-css3" },
      { name: "JavaScript",        niveau: 80, icon: "bxl-javascript" },
      { name: "React.js",          niveau: 80, icon: "bxl-react" },
      { name: "PHP",               niveau: 75, icon: "bxl-php" },
      { name: "Laravel",           niveau: 75, icon: "bxl-laravel" },
      { name: "API REST",          niveau: 75, icon: "bx-transfer" },
      { name: "Responsive Design", niveau: 85, icon: "bx-devices" },
      { name: "UI/UX Design",      niveau: 75, icon: "bx-palette" },
    ],
    techs: [
      { name: "React",          icon: "bxl-react" },
      { name: "Laravel",        icon: "bxl-laravel" },
      { name: "Firebase",       icon: "bxl-firebase" },
      { name: "Android Studio", icon: "bxl-android" },
      { name: "Vs Code",            icon: "bxl-vscode" },
      { name: "Git & GitHub",   icon: "bxl-github" },
      { name: "XAMPP",          icon: "bx-server" },
    ],
  },
  {
    key: "data",
    icon: "bx bx-data",
    color: "#7c3aed",
    skills: [
      { name: "MySQL",                      niveau: 85, icon: "bx-data" },
      { name: "Oracle Database",            niveau: 75, icon: "bx-cylinder" },
      { name: "SQL",                        niveau: 80, icon: "bx-code-curly" },
      { name: "Modélisation BDD",           niveau: 75, icon: "bx-sitemap" },
      { name: "Analyse de données",         niveau: 75, icon: "bx-bar-chart-alt-2" },
      { name: "Visualisation de données",   niveau: 70, icon: "bx-line-chart" },
      { name: "Data Science",               niveau: 65, icon: "bx-brain" },
    ],
    techs: [
      { name: "MySQL",           icon: "bx-data" },
      { name: "Oracle DB",       icon: "bx-cylinder" },
      { name: "SQL Developer",   icon: "bx-terminal" },
      { name: "Anaconda",        icon: "bx-code-block" },
      { name: "Jupyter Notebook",icon: "bx-book-open" },
    ],
  },
  {
    key: "ml",
    icon: "bx bx-brain",
    color: "#059669",
    skills: [
      { name: "Machine Learning",          niveau: 70, icon: "bx-chip" },
      { name: "Intelligence Artificielle", niveau: 60, icon: "bx-bot" },
      { name: "Analyse prédictive",        niveau: 55, icon: "bx-trending-up" },
      { name: "Prétraitement des données", niveau: 70, icon: "bx-filter-alt" },
      { name: "Algorithmes classification",niveau: 65, icon: "bx-category" },
      { name: "Réseaux de neurones",       niveau: 60, icon: "bx-network-chart" },
    ],
    techs: [
      { name: "Machine Learning", icon: "bx-chip" },
      { name: "Anaconda",         icon: "bx-code-block" },
      { name: "Jupyter Notebook", icon: "bx-book-open" },
    ],
  },
  {
    key: "network",
    icon: "bx bx-network-chart",
    color: "#dc2626",
    skills: [
      { name: "Réseaux informatiques",  niveau: 75, icon: "bx-network-chart" },
      { name: "Architecture TCP/IP",    niveau: 80, icon: "bx-sitemap" },
      { name: "Analyse réseau",         niveau: 70, icon: "bx-search-alt" },
      { name: "Cybersécurité",          niveau: 70, icon: "bx-shield-alt-2" },
      { name: "Capture de paquets",     niveau: 65, icon: "bx-radar" },
      { name: "Configuration réseau",   niveau: 70, icon: "bx-cog" },
    ],
    techs: [
      { name: "Wireshark",         icon: "bx-radar" },
      { name: "TCP/IP",            icon: "bx-transfer" },
      { name: "Oracle VirtualBox", icon: "bx-cube-alt" },
      { name: "VMware",            icon: "bx-server" },
    ],
  },
  {
    key: "sysadmin",
    icon: "bx bx-server",
    color: "#d97706",
    skills: [
      { name: "Administration système",     niveau: 70, icon: "bx-terminal" },
      { name: "Gestion utilisateurs",       niveau: 75, icon: "bx-user-check" },
      { name: "Configuration DHCP",         niveau: 75, icon: "bx-wifi" },
      { name: "Configuration DNS",          niveau: 75, icon: "bx-globe" },
      { name: "Maintenance système",        niveau: 70, icon: "bx-wrench" },
      { name: "Virtualisation",             niveau: 75, icon: "bx-cube-alt" },
      { name: "Déploiement serveur",        niveau: 65, icon: "bx-upload" },
    ],
    techs: [
      { name: "DHCP", icon: "bx-wifi" },
      { name: "DNS",  icon: "bx-globe" },
    ],
  },
  {
    key: "uml",
    icon: "bx bx-sitemap",
    color: "#0891b2",
    skills: [
      { name: "UML",                     niveau: 80, icon: "bx-sitemap" },
      { name: "Modélisation systèmes",   niveau: 70, icon: "bx-cube-alt" },
      { name: "Analyse fonctionnelle",   niveau: 70, icon: "bx-analyse" },
      { name: "Conception logicielle",   niveau: 70, icon: "bx-code-block" },
      { name: "Architecture SI",         niveau: 65, icon: "bx-buildings" },
    ],
    techs: [
      { name: "UML", icon: "bx-sitemap" },
    ],
  },
  {
    key: "project",
    icon: "bx bx-task",
    color: "#be185d",
    skills: [
      { name: "Scrum",              niveau: 75, icon: "bx-refresh" },
      { name: "Méthode Agile",      niveau: 75, icon: "bx-cycling" },
      { name: "Diagramme de Gantt", niveau: 90, icon: "bx-bar-chart-square" },
      { name: "Méthode PERT",       niveau: 90, icon: "bx-git-branch" },
      { name: "Gestion des tâches", niveau: 80, icon: "bx-task" },
      { name: "Travail collaboratif",niveau: 85, icon: "bx-group" },
    ],
    techs: [
      { name: "Jira",          icon: "bx-task" },
      { name: "Agora Project", icon: "bx-group" },
    ],
  },
];

// ══════════════════════════════════════════════════════════
// COMPOSANT BARRE DE PROGRESSION
// ══════════════════════════════════════════════════════════
const BarreProgression = ({ niveau, color }) => (
  <div
    className="h-1.5 rounded-full overflow-hidden"
    style={{ background: "var(--fond-eleve)" }}
  >
    <div
      className="h-full rounded-full transition-all duration-700"
      style={{
        width: `${niveau}%`,
        background: `linear-gradient(90deg, ${color}aa, ${color})`,
        boxShadow: `0 0 6px ${color}55`,
      }}
    />
  </div>
);

// ══════════════════════════════════════════════════════════
// COMPOSANT BADGE TECH
// ══════════════════════════════════════════════════════════
const BadgeTech = ({ name, icon, color }) => (
  <div
    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
    style={{
      background: `${color}15`,
      border:     `1px solid ${color}30`,
      color:      color,
    }}
  >
    <i className={`bx ${icon} text-sm`} />
    {name}
  </div>
);

// ══════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════
const Competences = () => {
  const { t } = useTranslation("competences");
  const [activeTab, setActiveTab] = useState("web");
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const categorie = categories.find((c) => c.key === activeTab);

  return (
    <div className="max-w-5xl mx-auto">

      {/* ── En-tête ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--texte-principal)" }}>
          {t("competences.title", "Compétences")}
        </h1>
        <p className="text-sm" style={{ color: "var(--texte-secondaire)" }}>
          {t("competences.subtitle", "Mes domaines de maîtrise techniques et méthodologiques.")}
        </p>
      </div>

      {/* ── Onglets de navigation ── */}
      <div
        className="flex flex-wrap gap-2 mb-6 p-1.5 rounded-xl"
        style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
      >
        {categories.map((cat) => {
          const isActive = activeTab === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
              style={
                isActive
                  ? { background: cat.color + "20", color: cat.color, border: `1px solid ${cat.color}40` }
                  : { color: "var(--texte-tertiaire)", border: "1px solid transparent" }
              }
            >
              <i className={`${cat.icon} text-sm`} />
              {t(`competences.cat.${cat.key}`, cat.key)}
            </button>
          );
        })}
      </div>

      {/* ── Contenu de la catégorie active ── */}
      {categorie && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Colonne gauche : skills + barres ── */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div
              className="rounded-xl p-5"
              style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
            >
              {/* Titre section */}
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: categorie.color + "20", border: `1px solid ${categorie.color}40` }}
                >
                  <i className={`${categorie.icon} text-base`} style={{ color: categorie.color }} />
                </div>
                <p className="text-sm font-semibold" style={{ color: "var(--texte-principal)" }}>
                  {t(`competences.cat.${categorie.key}`, categorie.key)}
                </p>
                <span
                  className="ml-auto text-xs px-2 py-0.5 rounded-full"
                  style={{ background: categorie.color + "15", color: categorie.color }}
                >
                  {categorie.skills.length} {t("competences.skills", "skills")}
                </span>
              </div>

              {/* Liste skills */}
              <div className="flex flex-col gap-4">
                {categorie.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <i
                          className={`bx ${skill.icon} text-sm`}
                          style={{ color: categorie.color }}
                        />
                        <span className="text-sm" style={{ color: "var(--texte-secondaire)" }}>
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-medium" style={{ color: categorie.color }}>
                        {skill.niveau}%
                      </span>
                    </div>
                    <BarreProgression niveau={skill.niveau} color={categorie.color} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Colonne droite : technologies ── */}
          <div className="flex flex-col gap-4">
            <div
              className="rounded-xl p-5"
              style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-4"
                style={{ color: "var(--texte-tertiaire)" }}
              >
                {t("competences.technologies", "Technologies")}
              </p>
              <div className="flex flex-wrap gap-2">
                {categorie.techs.map((tech) => (
                  <BadgeTech
                    key={tech.name}
                    name={tech.name}
                    icon={tech.icon}
                    color={categorie.color}
                  />
                ))}
              </div>
            </div>

            {/* Carte niveau moyen */}
            <div
              className="rounded-xl p-5"
              style={{ background: categorie.color + "10", border: `1px solid ${categorie.color}25` }}
            >
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: categorie.color + "aa" }}>
                {t("competences.avgLevel", "Niveau moyen")}
              </p>
              <p className="text-4xl font-bold mb-1" style={{ color: categorie.color }}>
                {Math.round(
                  categorie.skills.reduce((acc, s) => acc + s.niveau, 0) / categorie.skills.length
                )}%
              </p>
              <p className="text-xs" style={{ color: "var(--texte-tertiaire)" }}>
                {t("competences.avgDesc", "sur")} {categorie.skills.length} {t("competences.skills", "compétences")}
              </p>

              {/* Mini barre globale */}
              <div className="mt-3">
                <BarreProgression
                  niveau={Math.round(
                    categorie.skills.reduce((acc, s) => acc + s.niveau, 0) / categorie.skills.length
                  )}
                  color={categorie.color}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Competences;