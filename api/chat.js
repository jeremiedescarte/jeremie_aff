// ============================================================
// api/chat.js — Vercel Serverless Function
// Rôle : Recevoir un message du visiteur depuis le frontend,
//        construire un prompt enrichi avec le profil de Jeremie,
//        envoyer ce prompt à l'API Oxlo, et retourner la réponse.
// ============================================================

// On importe le profil de Jeremie depuis le fichier voisin
// Cela permet de centraliser toutes les infos dans profile.js
import profile from "./profile";

// Vercel expose cette fonction comme un endpoint HTTP
// Elle sera accessible à l'URL : /api/chat
export default async function handler(req, res) {

  // ── Sécurité : on accepte uniquement les requêtes POST ──
  // GET, PUT, DELETE, etc. seront rejetées avec un code 405
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ── Extraction du message envoyé par le frontend ──
    // Le frontend envoie : { message: "Quelles sont tes compétences ?" }
    const { message } = req.body;

    // ── Validation : on vérifie que le message existe et est bien une chaîne ──
    // Cela évite les crashs si le body est vide ou malformé
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message invalide" });
    }

    // ── Construction du prompt enrichi ──
    // On injecte toutes les données du profil dans le contexte de l'IA
    // pour qu'elle puisse répondre comme si elle était Jeremie
    const prompt = `
Tu es un assistant IA qui représente ${profile.fullName}, un développeur passionné et ambitieux.

Identité :
${profile.role}
${profile.contact.location} | ${profile.contact.email}

Résumé :
${profile.summary}

Formation :
${profile.education.map(e => `- ${e.degree}${e.options ? ` (${e.options})` : ""} — ${e.school} (${e.year})`).join("\n")}

Expérience :
${profile.experience.map(e => `- ${e.role} chez ${e.company} (${e.duration}, ${e.year}) : ${e.tasks.join(", ")}`).join("\n")}

Projets :
${profile.projects.map(p => `- ${p.name} (${p.type}, ${p.date}) — Stack: ${p.stack.join(", ")} — ${p.description}`).join("\n")}

Compétences techniques :
${profile.skills.technical.join(", ")}

Compétences professionnelles :
${profile.skills.professional.join(", ")}

Langues :
${profile.languages.map(l => `${l.lang} : ${l.level}`).join(" | ")}

Objectif :
${profile.goal}

Disponible pour opportunités internationales : Oui

Règles importantes :
- Détecte la langue du message (français ou anglais) et réponds DANS LA MÊME LANGUE
- Sois professionnel, chaleureux et concis (max 120 mots)
- Parle comme si tu étais ${profile.name} ou son représentant direct
- Mets en valeur ses projets concrets (Campus Link, SUPMTI Connect, Potfolio) naturellement
- Si la question sort du profil, invite à contacter ${profile.name} : ${profile.contact.email}

Question : ${message}
    `.trim();

    // ── Appel à l'API Oxlo ──
    // On envoie le prompt à l'IA via fetch (comme un appel axios mais natif)
    // La clé API est lue depuis les variables d'environnement Vercel (OXLO_API_KEY)
    // Elle n'est JAMAIS exposée au navigateur — c'est tout l'intérêt du serverless
    const response = await fetch("https://api.oxlo.ai/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OXLO_API_KEY}`, // clé secrète côté serveur
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: prompt }) // on envoie le prompt complet
    });

    // ── Vérification de la réponse Oxlo ──
    // Si l'API retourne une erreur HTTP (401, 500...), on lève une exception
    if (!response.ok) {
      throw new Error(`Oxlo API error: ${response.status}`);
    }

    // ── Extraction de la réponse JSON ──
    // Oxlo retourne un objet avec un champ "output" contenant la réponse texte
    const data = await response.json();

    // ── Envoi de la réponse au frontend ──
    // Le frontend recevra : { reply: "Voici mes compétences..." }
    res.status(200).json({
      reply: data.output || "Pas de réponse disponible."
    });

  } catch (error) {
    // ── Gestion des erreurs globales ──
    // On log l'erreur côté serveur (visible dans les logs Vercel)
    // et on renvoie un message générique au frontend
    console.error("Chat handler error:", error);
    res.status(500).json({ error: "Erreur serveur, veuillez réessayer." });
  }
}