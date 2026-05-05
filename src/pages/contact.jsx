import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

// ── Données des compétences ──
const skillsData = [
  { category: "Frontend",  name: "React.js",      level: 90 },
  { category: "Frontend",  name: "HTML / CSS",     level: 95 },
  { category: "Frontend",  name: "Tailwind CSS",   level: 85 },
  { category: "Backend",   name: "Laravel",        level: 85 },
  { category: "Backend",   name: "Node.js",        level: 75 },
  { category: "Backend",   name: "MySQL",          level: 80 },
  { category: "Mobile",    name: "React Native",   level: 70 },
  { category: "Outils",    name: "Git / GitHub",   level: 85 },
  { category: "Outils",    name: "Docker",         level: 65 },
];

// ── Données timeline expérience ──
const experienceData = [
  {
    year: "2024 — Présent",
    title: "Développeur Full Stack Freelance",
    company: "Auto-entrepreneur",
    description: "Conception et développement d'applications web complètes pour des clients variés. Stack principale : React, Laravel, MySQL.",
  },
  {
    year: "2023",
    title: "Développeur Frontend Stagiaire",
    company: "Agence Web XYZ",
    description: "Intégration de maquettes, développement de composants React, optimisation des performances.",
  },
];

// ── Données formations ──
const educationData = [
  {
    year: "2022 — 2024",
    title: "Licence en Informatique",
    school: "Université de Bénin",
    description: "Spécialisation en génie logiciel et systèmes distribués.",
  },
  {
    year: "2019 — 2022",
    title: "Baccalauréat Scientifique",
    school: "Lycée Technique",
    description: "Option mathématiques et sciences physiques.",
  },
];

// ── Composant barre de skill avec animation ──
const SkillBar = ({ name, level }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-[#ededed]">{name}</span>
        <span className="text-sm font-semibold text-[#00abf0]">{level}%</span>
      </div>
      <div className="w-full h-2 bg-[#ededed]/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#00abf0] rounded-full transition-all duration-1000 ease-out"
          style={{ width: animated ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
};

// ── Composant item timeline ──
const TimelineItem = ({ year, title, company, description, isLast }) => (
  <div className="relative pl-8">
    {/* Ligne verticale */}
    {!isLast && (
      <div className="absolute left-[7px] top-4 bottom-0 w-[2px] bg-[#00abf0]/30" />
    )}
    {/* Point */}
    <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-[#00abf0] bg-[#081b29]" />
    <div className="mb-8">
      <span className="text-xs font-semibold text-[#00abf0] uppercase tracking-widest">
        {year}
      </span>
      <h3 className="text-lg font-bold text-[#ededed] mt-1">{title}</h3>
      <p className="text-sm text-[#00abf0]/80 font-medium mb-2">{company}</p>
      <p className="text-sm text-[#ededed]/70 leading-relaxed">{description}</p>
    </div>
  </div>
);

// ── Page About ──
const About2 = () => {
  const categories = [...new Set(skillsData.map((s) => s.category))];

  return (
    <div className="min-h-screen px-6 md:px-[10%] pt-28 pb-20">

      {/* ───── TITRE DE PAGE ───── */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#ededed]">
          About <span className="text-[#00abf0]">Me</span>
        </h2>
        <div className="w-20 h-1 bg-[#00abf0] mx-auto mt-4 rounded-full" />
      </div>

      {/* ───── BLOC 1 : SKILLS ───── */}
      <section className="mb-20">
        <h3 className="text-2xl font-bold text-[#ededed] mb-10">
          🛠 <span className="text-[#00abf0]">Skills</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          {categories.map((cat) => (
            <div key={cat} className="mb-8">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-[#00abf0]/70 mb-4 border-b border-[#00abf0]/20 pb-2">
                {cat}
              </h4>
              {skillsData
                .filter((s) => s.category === cat)
                .map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
            </div>
          ))}
        </div>
      </section>

      {/* ───── BLOC 2 : EXPÉRIENCE ───── */}
      <section className="mb-20">
        <h3 className="text-2xl font-bold text-[#ededed] mb-10">
          💼 <span className="text-[#00abf0]">Expérience</span>
        </h3>
        <div>
          {experienceData.map((item, i) => (
            <TimelineItem
              key={i}
              {...item}
              isLast={i === experienceData.length - 1}
            />
          ))}
        </div>
      </section>

      {/* ───── BLOC 3 : FORMATIONS ───── */}
      <section className="mb-20">
        <h3 className="text-2xl font-bold text-[#ededed] mb-10">
          🎓 <span className="text-[#00abf0]">Formations</span>
        </h3>
        <div>
          {educationData.map((item, i) => (
            <TimelineItem
              key={i}
              {...item}
              isLast={i === educationData.length - 1}
            />
          ))}
        </div>
      </section>

      {/* ───── BLOC 4 : TÉLÉCHARGER CV ───── 
      <section className="flex justify-center">
        
          href=""
          download
          className="relative px-10 py-4 bg-[#00abf0] border-2 border-[#00abf0] text-[#081b29] font-bold rounded-lg overflow-hidden group transition-all duration-300 hover:text-[#00abf0] text-lg"
        >
          <span className="absolute inset-0 bg-[#081b29] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0" />
          <span className="relative z-10">📄 Télécharger mon CV</span>
        </a>
      </section>*/}

    </div>
  );
};

export default About2;