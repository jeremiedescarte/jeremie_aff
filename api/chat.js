// ============================================================
// api/chat.js — Vercel Serverless Function
// Rôle : Recevoir un message du visiteur, répondre via IA,
//        stocker la conversation dans Neon (PostgreSQL),
//        et notifier Jeremie par email si message important.
// ============================================================

import profile from "./profile.js";
import { neon } from "@neondatabase/serverless";

// ── Connexion Neon ──
const sql = neon(process.env.POSTGRES_URL);

// ── Configuration ──
const HF_URL = "https://router.huggingface.co/v1/chat/completions";

// ── Mots-clés qui déclenchent une notification email ──
const IMPORTANT_KEYWORDS = [
  "embauche", "recrutement", "recruter", "job", "emploi", "stage", "internship",
  "opportunité", "opportunity", "collabor", "projet", "project", "contact",
  "hire", "hiring", "freelance", "mission", "contrat", "contract"
];

// ── Vérifie si le message est important ──
function isImportant(message) {
  const lower = message.toLowerCase();
  return IMPORTANT_KEYWORDS.some(kw => lower.includes(kw));
}

// ── Envoie un email de notification via Resend ──
async function sendEmailNotification(message, reply) {
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Portfolio AI <onboarding@resend.dev>",
        to: process.env.NOTIFY_EMAIL,
        subject: "🔔 Message important sur ton portfolio !",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px;">
            <h2 style="color: #6366f1;">💬 Nouveau message important</h2>
            <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 16px 0;">
              <p style="margin: 0; font-size: 13px; color: #64748b;">MESSAGE DU VISITEUR</p>
              <p style="margin: 8px 0 0; font-size: 16px; color: #1e293b;">${message}</p>
            </div>
            <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin: 16px 0;">
              <p style="margin: 0; font-size: 13px; color: #64748b;">RÉPONSE DE L'IA</p>
              <p style="margin: 8px 0 0; font-size: 16px; color: #1e293b;">${reply}</p>
            </div>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">
              Envoyé automatiquement depuis ton portfolio · ${new Date().toLocaleString("fr-FR")}
            </p>
          </div>
        `
      })
    });
  } catch (err) {
    // On ne bloque pas la réponse si l'email échoue
    console.error("Email notification error:", err);
  }
}

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
    const prompt = `Tu es un assistant IA qui représente ${profile.fullName}, un développeur passionné et ambitieux.

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
- Si la question sort du profil, invite à contacter ${profile.name} : ${profile.contact.email}`;

    // ── Appel à l'API Hugging Face ──
    const response = await fetch(HF_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3.1-8B-Instruct:cerebras",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: message }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HF API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content?.trim() || "Pas de réponse disponible.";

    // ── Stockage dans Neon (PostgreSQL) ──
    const important = isImportant(message);

    await sql`
      INSERT INTO messages (message, reply, important)
      VALUES (${message}, ${reply}, ${important})
    `;

    // ── Notification email si message important ──
    if (important) {
      await sendEmailNotification(message, reply);
    }

    // ── Envoi au frontend ──
    res.status(200).json({ reply });

  } catch (error) {
    console.error("Chat handler error:", error);
    res.status(500).json({ error: "Erreur serveur, veuillez réessayer." });
  }
}