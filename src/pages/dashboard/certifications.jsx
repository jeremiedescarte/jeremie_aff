import { useState } from "react";
import { useTranslation } from "react-i18next";

// ══════════════════════════════════════════════════════════
// DONNÉES — fichiers PDF dans public/certificats/
// ══════════════════════════════════════════════════════════
const certificats = [
  {
    key: "cesam",
    color: "#f59e0b",
    icon: "bx bx-trophy",
    categorie: "associatif",
    date: "2024 – 2025",
    fichier: "/certificats/attestation-cesam.pdf",
  },
  {
    key: "aseesim",
    color: "#059669",
    icon: "bx bx-book-bookmark",
    categorie: "associatif",
    date: "2023 – 2024",
    fichier: "/certificats/attestation-aseesim.pdf",
  },
  {
    key: "meilleur",
    color: "#00abf0",
    icon: "bx bx-award",
    categorie: "academique",
    date: "2025",
    fichier: "/certificats/meilleur-promo.pdf",
  },
  {
    key: "debat",
    color: "#7c3aed",
    icon: "bx bx-conversation",
    categorie: "associatif",
    date: "2023",
    fichier: "/certificats/participation-debat.pdf",
  },

    {
    key: "Tournoi-foot",
    color: "#67dad6",
    icon: "bx bx-football",
    categorie: "autre",
    date: "2025",
    fichier: "/certificats/tournoi-foot.pdf",
  },
];

const categories = ["tous", "academique", "formation", "associatif", "autre"];

// ══════════════════════════════════════════════════════════
// COMPOSANT MODAL PDF
// ══════════════════════════════════════════════════════════
const ModalPDF = ({ certificat, onClose }) => {
  const { t } = useTranslation("certifications");

  // Fermer au clic sur l'overlay
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={handleOverlay}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "var(--fond-surface)",
          border:     "1px solid var(--bordure-douce)",
          maxHeight:  "90vh",
        }}
      >
        {/* ── Header modal ── */}
        <div
          className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--bordure-douce)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${certificat.color}20`, border: `1px solid ${certificat.color}30` }}
          >
            <i className={`${certificat.icon} text-base`} style={{ color: certificat.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: "var(--texte-principal)" }}>
              {t(`certifications.items.${certificat.key}.name`)}
            </p>
            <p className="text-xs" style={{ color: "var(--texte-tertiaire)" }}>
              {t(`certifications.items.${certificat.key}.org`)} · {certificat.date}
            </p>
          </div>

          {/* Bouton télécharger */}
          <a
            href={certificat.fichier}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80 flex-shrink-0"
            style={{ background: `${certificat.color}20`, color: certificat.color, border: `1px solid ${certificat.color}30` }}
          >
            <i className="bx bx-download text-sm" />
            {t("certifications.download", "Télécharger")}
          </a>

          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:opacity-80 flex-shrink-0"
            style={{ background: "var(--fond-eleve)", color: "var(--texte-secondaire)" }}
          >
            <i className="bx bx-x text-lg" />
          </button>
        </div>

        {/* ── Visionneuse PDF ── */}
        <div className="flex-1 overflow-hidden" style={{ minHeight: "500px" }}>
          <iframe
            src={certificat.fichier}
            className="w-full h-full"
            style={{ minHeight: "500px", border: "none" }}
            title={t(`certifications.items.${certificat.key}.name`)}
          />
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// COMPOSANT CARTE CERTIFICAT
// ══════════════════════════════════════════════════════════
const CarteCertificat = ({ cert, onClick }) => {
  const { t } = useTranslation("certifications");

  return (
    <button
      onClick={() => onClick(cert)}
      className="w-full text-left rounded-xl overflow-hidden transition-all duration-200 group hover:scale-[1.02]"
      style={{
        background: "var(--fond-surface)",
        border:     "1px solid var(--bordure-douce)",
        boxShadow:  "var(--ombre-carte)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--ombre-survolee)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--ombre-carte)")}
    >
      {/* ── Zone aperçu ── */}
      <div
        className="relative h-40 flex flex-col items-center justify-center gap-3"
        style={{ background: `${cert.color}10`, borderBottom: "1px solid var(--bordure-douce)" }}
      >
        {/* Icône PDF décorative */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
          style={{ background: `${cert.color}20`, border: `1px solid ${cert.color}35` }}
        >
          <i className={`${cert.icon} text-3xl`} style={{ color: cert.color }} />
        </div>

        {/* Badge PDF */}
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
          style={{ background: `${cert.color}15`, color: cert.color }}
        >
          <i className="bx bx-file-pdf text-xs" />
          PDF
        </span>

        {/* Icône loupe au hover */}
        <div
          className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: `${cert.color}25`, color: cert.color }}
        >
          <i className="bx bx-search text-sm" />
        </div>
      </div>

      {/* ── Infos ── */}
      <div className="p-4">
        <p className="text-sm font-semibold mb-1 leading-tight" style={{ color: "var(--texte-principal)" }}>
          {t(`certifications.items.${cert.key}.name`)}
        </p>
        <p className="text-xs mb-2" style={{ color: "var(--texte-tertiaire)" }}>
          {t(`certifications.items.${cert.key}.org`)}
        </p>
        <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--texte-secondaire)" }}>
          {t(`certifications.items.${cert.key}.desc`)}
        </p>

        {/* Footer carte */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--texte-muet)" }}>
            <i className="bx bx-calendar text-sm" />
            {cert.date}
          </span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{ background: `${cert.color}15`, color: cert.color }}
          >
            {t(`certifications.categories.${cert.categorie}`)}
          </span>
        </div>
      </div>
    </button>
  );
};

// ══════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ══════════════════════════════════════════════════════════
const Certifications = () => {
  const { t } = useTranslation("certifications");
  const [filtre, setFiltre] = useState("tous");
  const [modalCert, setModalCert] = useState(null);

  const certsFiltres = filtre === "tous"
    ? certificats
    : certificats.filter((c) => c.categorie === filtre);

  return (
    <div className="max-w-5xl mx-auto">

      {/* ── En-tête ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--texte-principal)" }}>
          {t("certifications.title", "Certifications")}
        </h1>
        <p className="text-sm" style={{ color: "var(--texte-secondaire)" }}>
          {t("certifications.subtitle", "Mes attestations, récompenses et participations.")}
        </p>
      </div>

      {/* ── Filtres ── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => {
          const isActive = filtre === cat;
          const count = cat === "tous"
            ? certificats.length
            : certificats.filter((c) => c.categorie === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setFiltre(cat)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={
                isActive
                  ? { background: "var(--accent-fond)", color: "var(--accent)", border: "1px solid var(--accent-bordure)" }
                  : { background: "var(--fond-surface)", color: "var(--texte-tertiaire)", border: "1px solid var(--bordure-douce)" }
              }
            >
              {t(`certifications.categories.${cat}`)}
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full"
                style={
                  isActive
                    ? { background: "var(--accent-fond)", color: "var(--accent)" }
                    : { background: "var(--fond-eleve)", color: "var(--texte-muet)" }
                }
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Grille certificats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certsFiltres.map((cert) => (
          <CarteCertificat
            key={cert.key}
            cert={cert}
            onClick={setModalCert}
          />
        ))}
      </div>

      {/* ── Modal PDF ── */}
      {modalCert && (
        <ModalPDF
          certificat={modalCert}
          onClose={() => setModalCert(null)}
        />
      )}
    </div>
  );
};

export default Certifications;