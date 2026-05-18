import { useState } from "react";
import { useTranslation } from "react-i18next";

// ══════════════════════════════════════════════════════════
// PROFILS DE CV
// Les fichiers PDF doivent être placés dans : public/cv/
// ══════════════════════════════════════════════════════════
const profils = [
  {
    key: "fullstack",
    color: "#00abf0",
    icon: "bx bx-code-alt",
    fichier: "/cv/cv-fullstack.pdf",
    competences: ["React.js", "Laravel", "MySQL", "API REST", "Tailwind CSS", "Git"],
  },
  {
    key: "datascience",
    color: "#7c3aed",
    icon: "bx bx-bar-chart-alt-2",
    fichier: "/cv/cv-datascience.pdf",
    competences: ["Python", "Jupyter", "Anaconda", "Oracle DB", "MySQL", "Data Analysis"],
  },
  {
    key: "cyber",
    color: "#dc2626",
    icon: "bx bx-shield-alt-2",
    fichier: "/cv/cv-cyber.pdf",
    competences: ["Wireshark", "TCP/IP", "Cybersécurité", "VirtualBox", "VMware", "Analyse réseau"],
  },
  {
    key: "sysadmin",
    color: "#d97706",
    icon: "bx bx-server",
    fichier: "/cv/cv-sysadmin.pdf",
    competences: ["DHCP", "DNS", "Virtualisation", "Linux", "Gestion serveurs", "Maintenance"],
  },
  {
    key: "gerant",
    color: "#059669",
    icon: "bx bx-briefcase",
    fichier: "/cv/cv-gerant.pdf",
    competences: ["Gestion d'équipe", "Leadership", "Organisation", "Communication", "Scrum", "Planification"],
  },
];

// ══════════════════════════════════════════════════════════
// COMPOSANT CARTE PROFIL
// ══════════════════════════════════════════════════════════
const CarteProfil = ({ profil, isSelected, onClick }) => {
  const { t } = useTranslation("cv");

  return (
    <button
      onClick={() => onClick(profil.key)}
      className="w-full text-left rounded-xl p-4 transition-all duration-200"
      style={{
        background: isSelected ? `${profil.color}12` : "var(--fond-surface)",
        border:     isSelected
          ? `1px solid ${profil.color}50`
          : "1px solid var(--bordure-douce)",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${profil.color}20`, border: `1px solid ${profil.color}30` }}
        >
          <i className={`${profil.icon} text-xl`} style={{ color: profil.color }} />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--texte-principal)" }}>
            {t(`cv.profils.${profil.key}.name`)}
          </p>
          <p className="text-xs" style={{ color: "var(--texte-tertiaire)" }}>
            {t(`cv.profils.${profil.key}.tagline`)}
          </p>
        </div>
        {isSelected && (
          <div
            className="ml-auto w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: profil.color }}
          />
        )}
      </div>

      {/* Compétences clés */}
      <div className="flex flex-wrap gap-1.5">
        {profil.competences.slice(0, 4).map((c) => (
          <span
            key={c}
            className="text-[10px] px-2 py-0.5 rounded-md"
            style={{ background: "var(--fond-eleve)", color: "var(--texte-tertiaire)" }}
          >
            {c}
          </span>
        ))}
        {profil.competences.length > 4 && (
          <span
            className="text-[10px] px-2 py-0.5 rounded-md"
            style={{ background: "var(--fond-eleve)", color: "var(--texte-muet)" }}
          >
            +{profil.competences.length - 4}
          </span>
        )}
      </div>
    </button>
  );
};

// ══════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════
const CV = () => {
  const { t } = useTranslation("cv");
  const [selected, setSelected] = useState("fullstack");

  const profil = profils.find((p) => p.key === selected);

  return (
    <div className="max-w-5xl mx-auto">

      {/* ── En-tête ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--texte-principal)" }}>
          {t("cv.title", "Mon CV")}
        </h1>
        <p className="text-sm" style={{ color: "var(--texte-secondaire)" }}>
          {t("cv.subtitle", "Sélectionne un profil pour voir et télécharger le CV adapté.")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Colonne gauche : liste des profils ── */}
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-widest px-1" style={{ color: "var(--texte-tertiaire)" }}>
            {t("cv.chooseProfile", "Choisir un profil")}
          </p>
          {profils.map((p) => (
            <CarteProfil
              key={p.key}
              profil={p}
              isSelected={selected === p.key}
              onClick={setSelected}
            />
          ))}
        </div>

        {/* ── Colonne droite : détail + actions ── */}
        {profil && (
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* ── Carte principale ── */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${profil.color}20`, border: `1px solid ${profil.color}35` }}
                >
                  <i className={`${profil.icon} text-2xl`} style={{ color: profil.color }} />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold mb-0.5" style={{ color: "var(--texte-principal)" }}>
                    {t(`cv.profils.${profil.key}.name`)}
                  </h2>
                  <p className="text-sm" style={{ color: "var(--texte-tertiaire)" }}>
                    {t(`cv.profils.${profil.key}.tagline`)}
                  </p>
                  {/* Badge */}
                  <span
                    className="inline-block mt-2 text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: `${profil.color}15`, color: profil.color }}
                  >
                    {t("cv.adapted", "CV adapté")}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--texte-secondaire)" }}>
                {t(`cv.profils.${profil.key}.desc`)}
              </p>

              {/* Compétences mises en avant */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--texte-tertiaire)" }}>
                  {t("cv.keySkills", "Compétences clés mises en avant")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {profil.competences.map((c) => (
                    <span
                      key={c}
                      className="text-xs px-2.5 py-1 rounded-lg font-medium"
                      style={{
                        background: `${profil.color}15`,
                        color:      profil.color,
                        border:     `1px solid ${profil.color}30`,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Boutons actions ── */}
              <div className="flex flex-col sm:flex-row gap-3">

                {/* Aperçu */}
                <a
                  href={profil.fichier}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] flex-1"
                  style={{
                    background: "var(--fond-eleve)",
                    color:      "var(--texte-principal)",
                    border:     "1px solid var(--bordure-moyenne)",
                  }}
                >
                  <i className="bx bx-show text-lg" />
                  {t("cv.preview", "Aperçu")}
                </a>

                {/* Télécharger */}
                <a
                  href={profil.fichier}
                  download
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] flex-1"
                  style={{
                    background: profil.color,
                    color:      "#fff",
                    border:     `1px solid ${profil.color}`,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <i className="bx bx-download text-lg" />
                  {t("cv.download", "Télécharger le PDF")}
                </a>
              </div>
            </div>

            {/* ── Carte info fichier ── */}
            <div
              className="rounded-xl p-4 flex items-center gap-3"
              style={{ background: "var(--fond-surface)", border: "1px solid var(--bordure-douce)" }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${profil.color}15`, border: `1px solid ${profil.color}25` }}
              >
                <i className="bx bx-file-pdf text-lg" style={{ color: profil.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium" style={{ color: "var(--texte-secondaire)" }}>
                  {`cv-${profil.key}.pdf`}
                </p>
                <p className="text-xs" style={{ color: "var(--texte-tertiaire)" }}>
                  {t("cv.fileInfo", "Fichier PDF · Mis à jour 2025")}
                </p>
              </div>
              <i className="bx bx-check-circle text-xl" style={{ color: profil.color }} />
            </div>

            {/* ── Carte conseil ── */}
            <div
              className="rounded-xl p-4 flex items-start gap-3"
              style={{
                background: "var(--accent-fond)",
                border:     "1px solid var(--accent-bordure)",
              }}
            >
              <i className="bx bx-info-circle text-lg mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
              <p className="text-xs leading-relaxed" style={{ color: "var(--texte-secondaire)" }}>
                {t("cv.tip", "Chaque CV est adapté pour mettre en valeur les compétences les plus pertinentes selon le poste visé. Choisis le profil qui correspond à l'opportunité que tu cibles.")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CV;