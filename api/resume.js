// ============================================================
// api/resume.js — Vercel Serverless Function
// Rôle : Recevoir le texte brut d'un CV depuis le frontend,
//        construire un prompt d'analyse RH,
//        envoyer à Hugging Face, et retourner l'analyse.
// API : Hugging Face Inference API (gratuite)
// Modèle : mistralai/Mistral-7B-Instruct-v0.2
// ============================================================

import profile from "./profile.js";

// Modèle Hugging Face utilisé
const HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.2";
const HF_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

export default async function handler(req, res) {

  // ── Sécurité : POST uniquement ──
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ── Extraction des données ──
    // cvText : texte brut du CV à analyser
    // lang   : langue souhaitée ("fr" par défaut)
    const { cvText, lang = "fr" } = req.body;

    if (!cvText || typeof cvText !== "string") {
      return res.status(400).json({ error: "CV text invalide" });
    }

    // ── Détection de la langue ──
    const isEn = lang === "en";

    // ── Construction du prompt au format Mistral Instruct ──
    const systemContext = isEn
      ? `You are an expert HR consultant and personal branding specialist.
Here is the candidate's full profile:
Name: ${profile.fullName} | Role: ${profile.role}
Education: ${profile.education.map(e => `${e.degree} at ${e.school} (${e.year})`).join(" | ")}
Experience: ${profile.experience.map(e => `${e.role} at ${e.company} (${e.duration}): ${e.tasks.join(", ")}`).join(" | ")}
Projects: ${profile.projects.map(p => `${p.name}: ${p.description} (Stack: ${p.stack.join(", ")})`).join(" | ")}
Technical Skills: ${profile.skills.technical.join(", ")}
Goal: ${profile.goal}

Analyze the following CV and provide:
1. **Professional pitch** (5 impactful lines)
2. **Key strengths** (4-5 bullet points)
3. **Areas of specialization**
4. **Improvement suggestions** (2-3 tips for international opportunities)`
      : `Tu es un expert RH et spécialiste du personal branding international.
Voici le profil complet du candidat :
Nom : ${profile.fullName} | Rôle : ${profile.role}
Formation : ${profile.education.map(e => `${e.degree} à ${e.school} (${e.year})`).join(" | ")}
Expérience : ${profile.experience.map(e => `${e.role} chez ${e.company} (${e.duration}) : ${e.tasks.join(", ")}`).join(" | ")}
Projets : ${profile.projects.map(p => `${p.name} : ${p.description} (Stack : ${p.stack.join(", ")})`).join(" | ")}
Compétences techniques : ${profile.skills.technical.join(", ")}
Objectif : ${profile.goal}

Analyse le CV suivant et fournis :
1. **Pitch professionnel** (5 lignes impactantes)
2. **Points forts** (4-5 points concrets)
3. **Domaines de spécialisation**
4. **Suggestions d'amélioration** (2-3 conseils pour opportunités internationales)`;

    // Format Mistral Instruct : [INST] ... [/INST]
    const prompt = `<s>[INST] ${systemContext}

CV :
${cvText} [/INST]`;

    // ── Appel à l'API Hugging Face ──
    const response = await fetch(HF_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,      // Plus long pour une analyse complète
          temperature: 0.5,         // Plus bas pour des réponses plus précises
          return_full_text: false,  // Uniquement la réponse générée
          do_sample: true
        }
      })
    });

    // ── Vérification de la réponse HTTP ──
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HF API error ${response.status}: ${errorText}`);
    }

    // ── Extraction de la réponse ──
    // Hugging Face retourne : [{ generated_text: "..." }]
    const data = await response.json();
    const summary = data[0]?.generated_text?.trim() || "Aucun résumé disponible.";

    // ── Envoi au frontend ──
    res.status(200).json({ summary });

  } catch (error) {
    console.error("Resume handler error:", error);
    res.status(500).json({ error: "Erreur serveur, veuillez réessayer." });
  }
}