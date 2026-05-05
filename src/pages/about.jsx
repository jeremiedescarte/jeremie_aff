import React from "react";

const About = () => {
  // Liste de tes compétences
  const skills = [
    { name: "React", level: "Avancé" },
    { name: "Tailwind CSS", level: "Avancé" },
    { name: "Node.js", level: "Intermédiaire" },
    { name: "Python", level: "Intermédiaire" },
    { name: "UI/UX Design", level: "Débutant" },
  ];

  // Liste de tes expériences
  const experiences = [
    {
      year: "2020 - Présent",
      title: "Développeur Full Stack",
      company: "Entreprise X",
      description: "Développement d'applications web avec React et Node.js.",
    },
    {
      year: "2018 - 2020",
      title: "Développeur Frontend",
      company: "Startup Y",
      description: "Création d'interfaces utilisateur avec Vue.js et Tailwind CSS.",
    },
  ];

  return (
    <div className="mt-20 min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Section Titre */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
          À propos de <span className="text-[#00abf0]">moi</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Développeur passionné par la création d'expériences utilisateur fluides et performantes.
        </p>
      </div>

      {/* Section Biographie */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mon parcours</h2>
          <p className="text-gray-600 leading-relaxed">
            Je suis Jérémie, développeur full stack avec plus de 5 ans d'expérience dans la création
            d'applications web modernes. Mon expertise couvre le frontend avec React et Tailwind CSS,
            ainsi que le backend avec Node.js et Python. Je suis toujours à la recherche de nouveaux
            défis pour repousser les limites de mes compétences.
          </p>
        </div>

        {/* Section Expériences */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Expériences</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-4 border-[#00abf0] pl-4">
                <p className="text-sm text-gray-500">{exp.year}</p>
                <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                <p className="text-gray-600">{exp.company}</p>
                <p className="mt-2 text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Compétences */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Mes compétences</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
              <h3 className="font-semibold text-gray-900">{skill.name}</h3>
              <p className="text-[#00abf0] text-sm">{skill.level}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section CTA */}
      <div className="max-w-7xl mx-auto text-center">
        <a
          href="/cv.pdf"
          download
          className="inline-block bg-[#00abf0] hover:bg-[#0088cc] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          Télécharger mon CV
        </a>
      </div>
    </div>
  );
};

export default About;