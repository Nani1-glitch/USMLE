import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const url = process.env.DATABASE_URL;

export const pool = url
  ? new Pool({ connectionString: url, max: 5 })
  : undefined;

export const db = pool ? drizzle(pool) : undefined;
