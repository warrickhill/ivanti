import { Elysia, t } from "elysia"
import ratings from "./ratings"
import {
    createDish,
    deleteDish,
    getDish,
    getDishes,
    updateDish,
} from "../repositories/dishes"

const dishSchema = t.Object({
    id: t.Optional(t.Integer()),
    name: t.String(),
    description: t.String(),
    image: t.String(),
    price: t.Number(),
})

export const dishes = new Elysia({ prefix: "/dishes" })
    .get("/", () => getDishes())
    .post("/", ({ body }) => createDish(body), {
        body: dishSchema,
    })
    .get("/:id", ({ params: { id } }) => getDish(id), {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .put("/:id", ({ params: { id }, body }) => updateDish(id, body), {
        body: dishSchema,
        params: t.Object({
            id: t.Number(),
        }),
    })
    .patch("/:id", ({ params: { id }, body }) => updateDish(id, body), {
        body: t.Partial(dishSchema),
        params: t.Object({
            id: t.Number(),
        }),
    })
    .delete("/:id", ({ params: { id } }) => deleteDish(id), {
        params: t.Object({
            id: t.Number(),
        }),
    })

export default dishes
