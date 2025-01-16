import { db } from "./db"
import { and, eq } from "drizzle-orm"
import { ratings } from "./schema"

type NewRating = typeof ratings.$inferInsert

export const getRatings = async () => {
    return await db.select().from(ratings)
}

export const createRating = async (user: NewRating) => {
    return await db.insert(ratings).values(user).returning()
}

export const getRating = async (userId: number, dishId: number) => {
    return (
        await db
            .select()
            .from(ratings)
            .where(and(eq(ratings.userId, userId), eq(ratings.dishId, dishId)))
    )[0]
}

export const updateRating = async (
    userId: number,
    dishId: number,
    data: NewRating,
) => {
    return await db
        .update(ratings)
        .set(data)
        .where(and(eq(ratings.userId, userId), eq(ratings.dishId, dishId)))
        .returning()
}

export const deleteRating = async (userId: number, dishId: number) => {
    return await db
        .delete(ratings)
        .where(and(eq(ratings.userId, userId), eq(ratings.dishId, dishId)))
}
