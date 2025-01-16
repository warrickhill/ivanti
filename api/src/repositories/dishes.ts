import { db } from "./db"
import { eq, getTableColumns, sql } from "drizzle-orm"
import { dishes, ratings } from "./schema"

type NewDish = typeof dishes.$inferInsert

export const getDishes = async () => {
    return await db
        .select({
            ...getTableColumns(dishes),
            rating: sql<number>`round(avg(${ratings.rating}), 1)`,
        })
        .from(dishes)
        .rightJoin(ratings, eq(dishes.id, ratings.dishId))
        .groupBy(dishes.id)
}

export const createDish = async (user: NewDish) => {
    return await db.insert(dishes).values(user).returning()
}

export const getDish = async (id: number) => {
    return (
        await db
            .select({
                ...getTableColumns(dishes),
                rating: sql<number>`round(avg(${ratings.rating}), 1)`,
            })
            .from(dishes)
            .rightJoin(ratings, eq(dishes.id, ratings.dishId))
            .groupBy(dishes.id)
            .where(eq(dishes.id, id))
    )[0]
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
