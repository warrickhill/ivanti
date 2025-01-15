import {db} from "./db"
import { eq, lt, gte, ne } from 'drizzle-orm';
import { users } from "./schema"

type NewUser = typeof users.$inferInsert;

export const getUsers = async () => {
    return await db.select().from(users)
}

export const createUser = async (user: NewUser) => {
    return await db.insert(users).values(user).returning()
}

export const getUser = async (id: number) => {
    return await db.selectDistinct().from(users).where(eq(users.id, id))
}