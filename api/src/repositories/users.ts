import { db } from "./db"
import { eq } from "drizzle-orm"
import { users } from "./schema"

type NewUser = typeof users.$inferInsert

export const getUsers = async () => {
    return await db.select().from(users)
}

export const createUser = async (user: NewUser) => {
    return await db.insert(users).values(user).returning()
}

export const getUser = async (id: number) => {
    return (await db.selectDistinct().from(users).where(eq(users.id, id)))[0]
}

export const updateUser = async (id: number, data: NewUser) => {
    return await db.update(users).set(data).where(eq(users.id, id)).returning()
}

export const deleteUser = async (id: number) => {
    return await db.delete(users).where(eq(users.id, id))
}
