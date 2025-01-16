import { Elysia, t } from "elysia"
import {
    createRating,
    deleteRating,
    getRating,
    getRatings,
    updateRating,
} from "../repositories/ratings"

const ratingSchema = t.Object({
    userId: t.Integer(),
    dishId: t.Integer(),
    rating: t.Integer({ minimum: 1, maximum: 5 }),
})

const params = t.Object({
    userId: t.Number(),
    dishId: t.Number(),
})

export const ratings = new Elysia({ prefix: "/ratings" })
    .get("/", () => getRatings())
    .post("/", ({ body }) => createRating(body), {
        body: ratingSchema,
    })
    .get(
        "/:userId/:dishId",
        ({ params: { userId, dishId } }) => getRating(userId, dishId),
        {
            params,
        },
    )
    .put(
        "/:userId/:dishId",
        ({ params: { userId, dishId }, body }) =>
            updateRating(userId, dishId, body),
        {
            body: ratingSchema,
            params,
        },
    )
    .patch(
        "/:userId/:dishId",
        ({ params: { userId, dishId }, body }) =>
            updateRating(userId, dishId, body),
        {
            body: t.Partial(ratingSchema),
            params,
        },
    )
    .delete(
        "/:userId/:dishId",
        ({ params: { userId, dishId } }) => deleteRating(userId, dishId),
        {
            params,
        },
    )

export default ratings
