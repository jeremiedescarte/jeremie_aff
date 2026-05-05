// ============================================================
// api/resume.js — Vercel Serverless Function
// Rôle : Recevoir le texte brut d'un CV depuis le frontend,
//        construire un prompt d'analyse RH enrichi avec le profil,
//        envoyer ce prompt à l'API Oxlo, et retourner l'analyse.
// ============================================================

// On importe le profil de Jeremie depuis le fichier voisin
import profile from "./profile";

// Vercel expose cette fonction comme un endpoint HTTP
// Elle sera accessible à l'URL : /api/resume
export default async function handler(req, res) {

  // ── Sécurité : on accepte uniquement les requêtes POST ──
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ── Extraction des données envoyées par le frontend ──
    // cvText  : le texte brut du CV à analyser
    // lang    : la langue souhaitée pour l'analyse ("fr" par défaut si non précisé)
    const { cvText, lang = "fr" } = req.body;

    // ── Validation : on vérifie que le texte CV est bien présent ──
    if (!cvText || typeof cvText !== "string") {
      return res.status(400).json({ error: "CV text invalide" });
    }

    // ── Détection de la langue ──
    // Si le frontend envoie lang: "en", on utilise le prompt anglais
    // Sinon, on utilise le prompt français par défaut
    const isEn = lang === "en";

    // ── Construction du prompt selon la langue ──
    // On utilise un opérateur ternaire : isEn ? promptAnglais : promptFrançais
    const prompt = isEn
      ? `
You are an expert HR consultant and personal branding specialist.
Here is the candidate's full profile:

Name: ${profile.fullName}
Role: ${profile.role}
Location: ${profile.contact.location}

Education:
${profile.education.map(e => `- ${e.degree}${e.options ? ` (${e.options})` : ""} — ${e.school} (${e.year})`).join("\n")}

Experience:
${profile.experience.map(e => `- ${e.role} at ${e.company} (${e.duration}): ${e.tasks.join(", ")}`).join("\n")}

Projects:
${profile.projects.map(p => `- ${p.name} (${p.type}, ${p.date}): ${p.description} | Stack: ${p.stack.join(", ")}`).join("\n")}

Technical Skills: ${profile.skills.technical.join(", ")}
Professional Skills: ${profile.skills.professional.join(", ")}
Languages: ${profile.languages.map(l => `${l.lang} (${l.level})`).join(", ")}
Goal: ${profile.goal}

Analyze the following CV and provide a compelling, recruiter-ready analysis in 4 sections:
1. **Professional pitch** (5 impactful lines highlighting his unique value)
2. **Key strengths** (4-5 bullet points, concrete and specific)
3. **Areas of specialization** (based on his real skills and projects)
4. **Improvement suggestions** (2-3 actionable tips to strengthen his profile for international opportunities)

CV:
${cvText}
      `.trim()

      // ── Prompt français ──
      : `
Tu es un expert RH et spécialiste du personal branding international.
Voici le profil complet du candidat :

Nom : ${profile.fullName}
Rôle : ${profile.role}
Localisation : ${profile.contact.location}

Formation :
${profile.education.map(e => `- ${e.degree}${e.options ? ` (${e.options})` : ""} — ${e.school} (${e.year})`).join("\n")}

Expérience :
${profile.experience.map(e => `- ${e.role} chez ${e.company} (${e.duration}) : ${e.tasks.join(", ")}`).join("\n")}

Projets :
${profile.projects.map(p => `- ${p.name} (${p.type}, ${p.date}) : ${p.description} | Stack : ${p.stack.join(", ")}`).join("\n")}

Compétences techniques : ${profile.skills.technical.join(", ")}
Compétences professionnelles : ${profile.skills.professional.join(", ")}
Langues : ${profile.languages.map(l => `${l.lang} (${l.level})`).join(", ")}
Objectif : ${profile.goal}

Analyse le CV suivant et fournis une analyse percutante en 4 sections :
1. **Pitch professionnel** (5 lignes impactantes qui valorisent son profil unique)
2. **Points forts** (4-5 points concrets et spécifiques à ses projets réels)
3. **Domaines de spécialisation** (basés sur ses vraies compétences et projets)
4. **Suggestions d'amélioration** (2-3 conseils actionnables pour les opportunités internationales)

CV :
${cvText}
      `.trim();

    // ── Appel à l'API Oxlo ──
    // On envoie le prompt construit ci-dessus à l'IA
    // La clé secrète OXLO_API_KEY est définie dans les variables d'environnement Vercel
    const response = await fetch("https://api.oxlo.ai/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OXLO_API_KEY}`, // jamais exposée au navigateur
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: prompt }) // on envoie le prompt complet à analyser
    });

    // ── Vérification de la réponse Oxlo ──
    // Si l'API retourne une erreur HTTP, on lève une exception pour aller dans le catch
    if (!response.ok) {
      throw new Error(`Oxlo API error: ${response.status}`);
    }

    // ── Extraction de la réponse JSON ──
    // Oxlo retourne un objet avec un champ "output" contenant l'analyse texte
    const data = await response.json();

    // ── Envoi de l'analyse au frontend ──
    // Le frontend recevra : { summary: "1. Pitch professionnel : ..." }
    res.status(200).json({
      summary: data.output || "Aucun résumé disponible."
    });

  } catch (error) {
    // ── Gestion des erreurs globales ──
    // On log l'erreur dans les logs Vercel pour le débogage
    // et on renvoie un message d'erreur générique au frontend
    console.error("Resume handler error:", error);
    res.status(500).json({ error: "Erreur serveur, veuillez réessayer." });
  }
}