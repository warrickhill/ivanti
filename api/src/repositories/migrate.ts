import { migrate } from "drizzle-orm/bun-sqlite/migrator"

import { drizzle } from "drizzle-orm/bun-sqlite"
import { db } from "./db"

await migrate(db, { migrationsFolder: "./drizzle" })
