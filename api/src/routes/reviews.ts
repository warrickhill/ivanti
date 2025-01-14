import { Elysia, t } from "elysia";

const reviewSchema = t.Object({
  id: t.Optional(t.Integer()),
  userId: t.Integer(),
  dishId: t.Integer(),
  rating: t.Integer({ minimum: 1, maximum: 5 }),
});

export const reviews = new Elysia({ prefix: "/reviews" })
  .get("/", () => [{ test: "utrtrf" }])
  .post("/", ({ body }) => body, {
    body: reviewSchema,
  })
  .get("/:id", () => {}, {
    params: t.Object({
      id: t.Number(),
    }),
  })
  .put("/:id", (body) => body, {
    body: reviewSchema,
    params: t.Object({
      id: t.Number(),
    }),
  })
  .patch("/:id", (body) => body, {
    body: t.Partial(reviewSchema),
    params: t.Object({
      id: t.Number(),
    }),
  })
  .delete("/:id", () => "hi", {
    params: t.Object({
      id: t.Number(),
    }),
  });

export default reviews;
