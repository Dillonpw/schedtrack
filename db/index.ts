import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema";

const connectionString = process.env.POSTGRES_URL;
console.log("POSTGRES_URL:", connectionString ? "defined" : "undefined");

if (!connectionString) {
  throw new Error(
    "Database connection URL is not defined. Please check your environment variables.",
  );
}

export const db = drizzle(sql, { schema });
