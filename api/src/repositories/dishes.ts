import { db } from "./db"
import { eq } from "drizzle-orm"
import { dishes } from "./schema"

type NewDish = typeof dishes.$inferInsert

export const getDishes = async () => {
    return await db.select().from(dishes)
}

export const createDish = async (user: NewDish) => {
    return await db.insert(dishes).values(user).returning()
}

export const getDish = async (id: number) => {
    return (await db.selectDistinct().from(dishes).where(eq(dishes.id, id)))[0]
}

export const updateDish = async (id: number, data: NewDish) => {
    return await db
        .update(dishes)
        .set(data)
        .where(eq(dishes.id, id))
        .returning()
}

export const deleteDish = async (id: number) => {
    return await db.delete(dishes).where(eq(dishes.id, id))
}
