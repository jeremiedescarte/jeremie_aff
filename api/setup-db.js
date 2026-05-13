// pour ma base de données (SQLite ou NeonDB) pour stocker les messages du chat, les visites du portfolio, etc.
//import { neon } from "@neondatabase/serverless";

//const sql = neon(process.env.POSTGRES_URL);

//export default async function handler(req, res) {
  //await sql`
    //CREATE TABLE IF NOT EXISTS messages (
      //id SERIAL PRIMARY KEY,
      //message TEXT NOT NULL,
      //reply TEXT NOT NULL,
      //important BOOLEAN DEFAULT false,
      //created_at TIMESTAMP DEFAULT NOW()
    //)
  //`;
  //res.status(200).json({ ok: true });
//}