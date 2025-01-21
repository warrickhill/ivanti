import { relations } from "drizzle-orm/relations"
import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
    id: integer().primaryKey({ autoIncrement: true }),
    username: text().unique(),
    email: text().unique(),
    password: text(),
    contactNumber: text("contact_number"),
    type: text().$type<"Admin" | "Customer">().default("Customer"),
    isBlocked: integer("is_blocked", { mode: "boolean" }).default(false),
})

export const dishes = sqliteTable("dishes", {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text(),
    description: text(),
    image: text(),
    price: integer({ mode: "number" }),
})

export const ratings = sqliteTable(
    "ratings",
    {
        userId: integer("user_id"),
        dishId: integer("dish_id"),
        rating: integer(),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.userId, table.dishId] }),
        }
    },
)

export const userRatingsRelations = relations(ratings, ({ one }) => ({
    user: one(users, {
        fields: [ratings.userId],
        references: [users.id],
    }),
    dish: one(dishes, {
        fields: [ratings.dishId],
        references: [dishes.id],
    }),
}))
