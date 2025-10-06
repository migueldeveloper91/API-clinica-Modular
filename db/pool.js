import dns from "dns";
import pkg from "pg";
const { Pool } = pkg;

dns.setDefaultResultOrder("ipv4first"); // 👈 fuerza IPv4

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
