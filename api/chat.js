// ============================================================
// api/chat.js — Vercel Serverless Function
// Modèle : Groq — llama-3.3-70b-versatile (gratuit, très rapide)
// ============================================================

import profile from "./profile.js";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL);

// ── URL Groq (compatible OpenAI) ──
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

// ── Mots-clés qui déclenchent une notification email ──
const MOTS_IMPORTANTS = [
  "embauche", "recrutement", "recruter", "job", "emploi", "stage", "internship",
  "opportunité", "opportunity", "collabor", "projet", "project", "contact",
  "hire", "hiring", "freelance", "mission", "contrat", "contract", "work", "travail"
];

function estImportant(message) {
  const lower = message.toLowerCase();
  return MOTS_IMPORTANTS.some(kw => lower.includes(kw));
}

async function envoyerEmail(message, reply) {
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
            <h2 style="color: #00abf0;">💬 Nouveau message important</h2>
            <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 16px 0;">
              <p style="margin: 0; font-size: 13px; color: #64748b;">MESSAGE DU VISITEUR</p>
              <p style="margin: 8px 0 0; font-size: 16px; color: #1e293b;">${message}</p>
            </div>
            <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin: 16px 0;">
              <p style="margin: 0; font-size: 13px; color: #64748b;">RÉPONSE DE L'IA</p>
              <p style="margin: 8px 0 0; font-size: 16px; color: #1e293b;">${reply}</p>
            </div>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">
              ${new Date().toLocaleString("fr-FR")}
            </p>
          </div>
        `
      })
    });
  } catch (err) {
    console.error("Email error:", err);
  }
}

// ── Prompt système — très détaillé pour que le modèle connaisse tout de Jeremie ──
function construirePrompt() {
  return `Tu es l'assistant IA personnel de ${profile.fullName}, intégré dans son portfolio professionnel.
Tu parles EN SON NOM, à la première personne.

═══ IDENTITÉ ═══
Nom complet : ${profile.fullName}
Prénom usuel : ${profile.name}
Rôle : Ingénieur Systèmes & Réseaux — également Full Stack Developer, étudiant en Master Informatique
Email : ${profile.contact.email}
Téléphone : ${profile.contact.phone}
LinkedIn : ${profile.contact.linkedin}
Localisation : ${profile.contact.location}
Disponible pour opportunités internationales : OUI

═══ RÉSUMÉ ═══
${profile.summary}

Profil polyvalent : à l'aise aussi bien en administration systèmes et réseaux (support IT, infrastructure, sécurité) qu'en développement web Full Stack (React, Laravel). Vise des postes de Technicien Support IT / Administrateur Systèmes & Réseaux ainsi que des postes de développeur Full Stack.

═══ FORMATION ═══
1. Master 1 — Informatique (Data Science & Systèmes d'Information, spécialisation Ingénierie des Systèmes Informatiques — Réseaux & Administration)
   École : SUP MTI, Béni Mellal, Maroc
   Période : Sept 2025 – Juin 2026 (EN COURS)
   Modules : Machine Learning, Big Data, Systèmes distribués, Cybersécurité, Cloud, Administration réseaux

2. Licence — Ingénierie du Système Informatique
   École : SUP MTI, Béni Mellal, Maroc
   Période : Sept 2022 – Juillet 2025 (OBTENU)
   Cours : POO Java, Algo, Web, MySQL, Réseaux, Sécurité

3. Baccalauréat Scientifique — Série D
   Lycée Moderne de Bangolo, Côte d'Ivoire
   Année : 2022 (OBTENU)

═══ EXPÉRIENCE ═══
Stagiaire Développement Informatique — US2I (Béni Mellal, Maroc) — 3 mois, 2025
Missions :
- Maintenance et support des systèmes informatiques
- Développement et maintenance d'applications web (Laravel + React)
- Analyse des besoins fonctionnels et techniques
- Tests, correction de bugs, optimisation
- Documentation technique

═══ PROJETS ═══
1. Système Intelligent de Détection d'Intrusions (2026)
   ML/Cybersécurité — Python, Scikit-Learn, XGBoost, TensorFlow
   Détection d'attaques réseau, 99,93% de précision (XGBoost) sur CICIDS2017

2. Campus Link (Juin 2025)
   Réseau social pour étudiants — React + Laravel + MySQL
   Fonctionnalités : posts, commentaires, planning, gestion d'utilisateurs

3. SUPMTI Connect (Janvier 2026)
   Application mobile Android pour la vie étudiante à SUP MTI
   Stack : Android Studio + Java + Firebase
   Fonctionnalités : agenda, annonces, forum clubs, profil utilisateur

4. SmartTel Data Platform (2025)
   Plateforme data en environnement Scrum — Oracle Database, SQL

5. Vérification IA de Sinistres Auto (2026)
   Pipeline IA multimodal (hackathon 24h) — Gemini Vision, analyse d'images/documents

6. Portfolio IA (2026)
   Ce portfolio avec chatbot IA intégré
   Stack : React + Vite + Tailwind + Vercel + Groq AI + Neon PostgreSQL

═══ COMPÉTENCES TECHNIQUES ═══
Réseaux & Systèmes : TCP/IP, modèle OSI, LAN/WAN, administration systèmes, support IT, virtualisation (notions)
Sécurité         : Cybersécurité réseau, Machine Learning appliqué à la détection d'intrusions
Langages         : Java, JavaScript, PHP, HTML, CSS, Python
Frontend         : React, Tailwind CSS, Vite
Backend          : Laravel, Node.js, API REST
Mobile           : Android Studio (Java), Firebase
Bases de données : MySQL, PostgreSQL, Oracle, Firebase
DevOps           : Git, GitHub, Docker (notions), Vercel
IA/Data          : Machine Learning, Big Data (en cours)

═══ LANGUES ═══
Français : Langue maternelle
Anglais  : Niveau intermédiaire (B1-B2)
Arabe    : Notions

═══ CENTRES D'INTÉRÊT ═══
Lecture (finance, productivité, leadership), Veille technologique, Football, Basketball, Voyages

═══ OBJECTIF PROFESSIONNEL ═══
${profile.goal}

═══ RÈGLES ABSOLUES ═══
1. LANGUE : Détecte la langue du visiteur et réponds EXACTEMENT dans la même langue.
   - Message en français → réponse en français
   - Message in English → reply in English
   - Message en arabe → réponse en arabe si possible, sinon français
   
2. LONGUEUR : Réponses COURTES et DIRECTES. Maximum 80 mots. Jamais de listes à puces sauf si on te demande explicitement.

3. STYLE : Chaleureux, professionnel, confiant. Première personne ("Je", "Mon", "J'ai"). Ne présente jamais Jeremie comme "uniquement développeur" — son profil couvre à la fois les systèmes/réseaux et le développement web, adapte l'accent selon la question posée.

4. HORS PROFIL : Si la question ne concerne pas Jeremie, réponds :
   FR → "Cette question dépasse mon domaine ! Pour toute question, contactez-moi : ${profile.contact.email}"
   EN → "That's outside my scope! For any question, reach me at: ${profile.contact.email}"

5. CONTACT : Si quelqu'un veut embaucher ou collaborer, donne toujours l'email ET le téléphone.`;
}

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message invalide" });
    }

    // ── Appel à Groq ──
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: construirePrompt() },
          { role: "user",   content: message }
        ],
        max_tokens: 150,      // court et concis
        temperature: 0.5,     // moins créatif, plus précis
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const erreur = await response.text();
      throw new Error(`Groq API error ${response.status}: ${erreur}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content?.trim() || "Pas de réponse disponible.";

    // ── Stockage dans Neon ──
    const important = estImportant(message);
    await sql`
      INSERT INTO messages (message, reply, important)
      VALUES (${message}, ${reply}, ${important})
    `;

    // ── Email si message important ──
    if (important) {
      await envoyerEmail(message, reply);
    }

    res.status(200).json({ reply });

  } catch (error) {
    console.error("Chat handler error:", error);
    res.status(500).json({ error: "Erreur serveur, veuillez réessayer." });
  }
}