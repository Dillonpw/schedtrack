import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";


if (!process.env.POSTGRES_URL) {
  throw new Error("Database connection URL is not defined");
}

export const db = drizzle(sql);
