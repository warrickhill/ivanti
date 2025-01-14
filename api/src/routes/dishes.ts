import { Elysia, t } from "elysia";
import reviews from "./reviews";

const dishSchema = t.Object({
  id: t.Optional(t.Integer()),
  name: t.String(),
  description: t.String(),
  image: t.String(),
  price: t.Number(),
});

export const dishes = new Elysia({ prefix: "/dishes" })
  .get("/", () => [{ test: "utrtrf" }])
  .post("/", ({ body }) => body, {
    body: dishSchema,
  })
  .get("/:id", () => {}, {
    params: t.Object({
      id: t.Number(),
    }),
  })
  .put("/:id", (body) => body, {
    body: dishSchema,
    params: t.Object({
      id: t.Number(),
    }),
  })
  .patch("/:id", (body) => body, {
    body: t.Partial(dishSchema),
    params: t.Object({
      id: t.Number(),
    }),
  })
  .delete("/:id", () => "hi", {
    params: t.Object({
      id: t.Number(),
    }),
  })
  .use(reviews)

export default dishes;
