// A Vercel serverless function. Any file in /api becomes an HTTP endpoint:
// this one answers requests to  /api/splits
//
// It runs ON THE SERVER, so it can safely read process.env.DATABASE_URL
// (the secret Vercel injected from Neon). The browser never sees that secret.

const { neon } = require("@neondatabase/serverless");

// Open a connection to Neon using the secret connection string.
const sql = neon(process.env.DATABASE_URL);

module.exports = async (req, res) => {
  try {
    // READ: return the 10 most recent saved splits.
    if (req.method === "GET") {
      const rows = await sql`
        SELECT bill, tip_percent, people, per_person, created_at
        FROM splits
        ORDER BY created_at DESC
        LIMIT 10
      `;
      return res.status(200).json({ splits: rows });
    }

    // WRITE: save one new split.
    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      const { bill, tipPercent, people, perPerson } = body;

      // Basic validation — never trust input blindly.
      if ([bill, tipPercent, people, perPerson].some((v) => typeof v !== "number")) {
        return res.status(400).json({ error: "All fields must be numbers." });
      }

      await sql`
        INSERT INTO splits (bill, tip_percent, people, per_person)
        VALUES (${bill}, ${tipPercent}, ${people}, ${perPerson})
      `;
      return res.status(201).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: "Database error", detail: String(err.message || err) });
  }
};
