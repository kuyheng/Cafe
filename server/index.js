import express from "express";
import pg from "pg";
import fs from "fs";
import path from "path";

const { Pool } = pg;

const app = express();
app.use(express.json());

function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");
    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const API_PORT = Number(process.env.API_PORT || 3001);

function isTruthy(value) {
  return value === "1" || String(value).toLowerCase() === "true";
}

function createPool() {
  const sslEnabled = isTruthy(process.env.PGSSL || "false");
  const ssl = sslEnabled ? { rejectUnauthorized: false } : undefined;
  const password = String(process.env.PGPASSWORD ?? "");

  if (process.env.DATABASE_URL) {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl,
    });
  }

  return new Pool({
    host: process.env.PGHOST || "127.0.0.1",
    port: Number(process.env.PGPORT || 5432),
    user: process.env.PGUSER || "postgres",
    password,
    database: process.env.PGDATABASE || "Cafe",
    ssl,
  });
}

const pool = createPool();

const defaultMenuSeed = [
  { name: "Espresso", category: "coffee", price: 3.5, description: "Bold, concentrated coffee shot", image_key: "coffee" },
  { name: "Cappuccino", category: "coffee", price: 4.5, description: "Espresso with steamed milk foam", image_key: "coffee" },
  { name: "Caramel Latte", category: "coffee", price: 5.5, description: "Signature house-made caramel latte", image_key: "coffee" },
  { name: "Mocha", category: "coffee", price: 5.0, description: "Chocolate meets espresso perfection", image_key: "coffee" },
  { name: "Cold Brew", category: "coffee", price: 4.0, description: "Smooth, slow-steeped cold coffee", image_key: "coffee" },
  { name: "Butter Croissant", category: "pastries", price: 4.0, description: "Flaky French pastry", image_key: "pastry" },
  { name: "Chocolate Muffin", category: "pastries", price: 3.5, description: "Rich double-chocolate muffin", image_key: "pastry" },
  { name: "Cinnamon Roll", category: "pastries", price: 4.5, description: "Warm, gooey cinnamon swirl", image_key: "pastry" },
  { name: "Eggs Benedict", category: "food", price: 12.0, description: "Poached eggs with hollandaise", image_key: "food" },
  { name: "Avocado Toast", category: "food", price: 10.0, description: "Smashed avo on sourdough", image_key: "food" },
  { name: "Club Sandwich", category: "food", price: 11.0, description: "Triple-decker classic", image_key: "food" },
  { name: "Fresh Juice", category: "drinks", price: 5.0, description: "Seasonal fresh-pressed juice", image_key: "coffee" },
  { name: "Iced Tea", category: "drinks", price: 3.5, description: "House-brewed peach iced tea", image_key: "coffee" },
  { name: "Smoothie Bowl", category: "drinks", price: 8.0, description: "Acai berry with granola topping", image_key: "coffee" },
];

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
      description TEXT,
      image_key TEXT DEFAULT 'coffee',
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS reservations (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      reservation_date DATE NOT NULL,
      reservation_time TIME NOT NULL,
      guests INTEGER NOT NULL CHECK (guests > 0),
      notes TEXT,
      status TEXT NOT NULL DEFAULT 'Pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      is_read BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  const countResult = await pool.query("SELECT COUNT(*)::INT AS count FROM menu_items;");
  const currentCount = countResult.rows[0]?.count ?? 0;

  if (currentCount > 0) {
    return;
  }

  for (const item of defaultMenuSeed) {
    await pool.query(
      `
        INSERT INTO menu_items (name, category, price, description, image_key, is_active)
        VALUES ($1, $2, $3, $4, $5, TRUE);
      `,
      [item.name, item.category, item.price, item.description, item.image_key],
    );
  }
}

function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

app.get(
  "/api/health",
  asyncHandler(async (_req, res) => {
    const result = await pool.query("SELECT current_database() AS database_name;");
    res.json({
      ok: true,
      database: result.rows[0]?.database_name || process.env.PGDATABASE || "Cafe",
    });
  }),
);

app.get(
  "/api/menu-items",
  asyncHandler(async (_req, res) => {
    const result = await pool.query(`
      SELECT id, name, category, price, description, image_key, is_active
      FROM menu_items
      ORDER BY category ASC, name ASC;
    `);
    res.json(result.rows);
  }),
);

app.get(
  "/api/reservations",
  asyncHandler(async (_req, res) => {
    const result = await pool.query(`
      SELECT
        id,
        name,
        email,
        reservation_date,
        reservation_time,
        guests,
        notes,
        status,
        created_at
      FROM reservations
      ORDER BY reservation_date DESC, reservation_time DESC, id DESC;
    `);
    res.json(result.rows);
  }),
);

app.post(
  "/api/reservations",
  asyncHandler(async (req, res) => {
    const { name, email, date, time, guests, notes } = req.body || {};
    const guestCount = Number(guests);

    if (!name || !date || !time || !Number.isFinite(guestCount) || guestCount < 1) {
      return res.status(400).json({ error: "name, date, time and guests are required." });
    }

    const result = await pool.query(
      `
        INSERT INTO reservations (name, email, reservation_date, reservation_time, guests, notes, status)
        VALUES ($1, $2, $3, $4, $5, $6, 'Pending')
        RETURNING id, name, email, reservation_date, reservation_time, guests, notes, status, created_at;
      `,
      [name.trim(), email?.trim() || null, date, time, guestCount, notes?.trim() || null],
    );

    res.status(201).json(result.rows[0]);
  }),
);

app.patch(
  "/api/reservations/:id/status",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const status = String(req.body?.status || "");
    const allowed = new Set(["Pending", "Confirmed", "Cancelled"]);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid reservation id." });
    }
    if (!allowed.has(status)) {
      return res.status(400).json({ error: "Status must be Pending, Confirmed, or Cancelled." });
    }

    const result = await pool.query(
      `
        UPDATE reservations
        SET status = $1
        WHERE id = $2
        RETURNING id, name, email, reservation_date, reservation_time, guests, notes, status, created_at;
      `,
      [status, id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    res.json(result.rows[0]);
  }),
);

app.get(
  "/api/messages",
  asyncHandler(async (_req, res) => {
    const result = await pool.query(`
      SELECT id, name, email, subject, message, is_read, created_at
      FROM messages
      ORDER BY created_at DESC, id DESC;
    `);
    res.json(result.rows);
  }),
);

app.post(
  "/api/messages",
  asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email and message are required." });
    }

    const result = await pool.query(
      `
        INSERT INTO messages (name, email, subject, message, is_read)
        VALUES ($1, $2, $3, $4, FALSE)
        RETURNING id, name, email, subject, message, is_read, created_at;
      `,
      [name.trim(), email.trim(), subject?.trim() || null, message.trim()],
    );

    res.status(201).json(result.rows[0]);
  }),
);

app.patch(
  "/api/messages/:id/read",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid message id." });
    }

    const result = await pool.query(
      `
        UPDATE messages
        SET is_read = TRUE
        WHERE id = $1
        RETURNING id, name, email, subject, message, is_read, created_at;
      `,
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Message not found." });
    }

    res.json(result.rows[0]);
  }),
);

app.delete(
  "/api/messages/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: "Invalid message id." });
    }

    const result = await pool.query("DELETE FROM messages WHERE id = $1;", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Message not found." });
    }

    res.status(204).send();
  }),
);

app.use((error, _req, res, _next) => {
  console.error("[api] unexpected error", error);
  res.status(500).json({ error: "Internal server error." });
});

async function start() {
  await ensureSchema();

  app.listen(API_PORT, () => {
    console.log(`[api] running on http://localhost:${API_PORT}`);
  });
}

start().catch((error) => {
  if (String(error?.message || "").includes("SASL")) {
    console.error("[api] set a valid non-empty PGPASSWORD in .env (or use DATABASE_URL).");
  }
  console.error("[api] failed to start", error);
  process.exit(1);
});

process.on("SIGINT", async () => {
  await pool.end();
  process.exit(0);
});
