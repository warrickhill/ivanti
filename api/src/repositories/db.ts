import { drizzle } from "drizzle-orm/bun-sqlite"
import sqlite from "../../sqlite.db" with { type: "sqlite" }

export const db = drizzle({ client: sqlite })
