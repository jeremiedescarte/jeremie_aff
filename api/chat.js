// ============================================================
// api/chat.js — Vercel Serverless Function
// Rôle : Recevoir un message du visiteur depuis le frontend,
//        construire un prompt enrichi avec le profil de Jeremie,
//        envoyer ce prompt à Hugging Face, et retourner la réponse.
// API : Hugging Face Inference API (gratuite)
// Modèle : mistralai/Mistral-7B-Instruct-v0.2
// ============================================================

import profile from "./profile.js";

// Modèle Hugging Face utilisé — Mistral 7B est rapide et gratuit
const HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.2";

// URL de l'API Hugging Face Inference
const HF_URL =`https://router.huggingface.co/hf-inference/models/${HF_MODEL}/v1/chat/completions`;

export default async function handler(req, res) {

  // ── Sécurité : POST uniquement ──
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ── Extraction et validation du message ──
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message invalide" });
    }

    // ── Construction du prompt ──
    // Mistral Instruct utilise le format [INST] ... [/INST]
    // On injecte le profil dans le system prompt et le message du visiteur dans [INST]
    const prompt = `<s>[INST] Tu es un assistant IA qui représente ${profile.fullName}, un développeur passionné et ambitieux.

Identité : ${profile.role}
Localisation : ${profile.contact.location}

Résumé : ${profile.summary}

Formation :
${profile.education.map(e => `- ${e.degree}${e.options ? ` (${e.options})` : ""} — ${e.school} (${e.year})`).join("\n")}

Expérience :
${profile.experience.map(e => `- ${e.role} chez ${e.company} (${e.duration}) : ${e.tasks.join(", ")}`).join("\n")}

Projets :
${profile.projects.map(p => `- ${p.name} (${p.type}, ${p.date}) — Stack: ${p.stack.join(", ")} — ${p.description}`).join("\n")}

Compétences techniques : ${profile.skills.technical.join(", ")}

Langues : ${profile.languages.map(l => `${l.lang} : ${l.level}`).join(" | ")}

Objectif : ${profile.goal}

Règles importantes :
- Détecte la langue du message (français ou anglais) et réponds DANS LA MÊME LANGUE
- Sois professionnel, chaleureux et concis (max 120 mots)
- Parle comme si tu étais ${profile.name} ou son représentant direct
- Mets en valeur ses projets (Campus Link, SUPMTI Connect, Portfolio) naturellement
- Si la question sort du profil, invite à contacter ${profile.name} : ${profile.contact.email}

Question : ${message} [/INST]`;

    // ── Appel à l'API Hugging Face ──
    // On envoie le prompt au modèle Mistral via l'endpoint Inference
    const response = await fetch(HF_URL, {
      method: "POST",
      headers: {
        // Token Hugging Face stocké en variable d'environnement Vercel
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
body: JSON.stringify({
  model: HF_MODEL,
  messages: [
    { role: "system", content: prompt },
    { role: "user", content: message }
  ],
  max_tokens: 200,
  temperature: 0.7
})

    });

    // ── Vérification de la réponse HTTP ──
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HF API error ${response.status}: ${errorText}`);
    }

    // ── Extraction de la réponse ──
    // Hugging Face retourne un tableau : [{ generated_text: "..." }]
    const data = await response.json();

    // On récupère le texte généré et on nettoie les espaces superflus
    const reply = data.choices[0].message.content?.trim() || "Pas de réponse disponible.";

    // ── Envoi au frontend ──
    res.status(200).json({ reply });

  } catch (error) {
    console.error("Chat handler error:", error);
    res.status(500).json({ error: "Erreur serveur, veuillez réessayer." });
  }
}