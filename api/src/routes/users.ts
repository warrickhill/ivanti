import { Elysia, t } from "elysia";
import reviews from "./reviews";

const userSchema = t.Object({
  id: t.Optional(t.Integer()),
  username: t.String(),
  password: t.String(),
  email: t.String({ format: "email" }),
  contactNumber: t.String(),
});

export const users = new Elysia({ prefix: "/users" })
  .get("/", () => [{ test: "utrtrf" }])
  .post("/", ({ body }) => body, {
    body: userSchema,
  })
  .get("/:id", () => {}, {
    params: t.Object({
      id: t.Number(),
    }),
  })
  .put("/:id", (body) => body, {
    body: userSchema,
    params: t.Object({
      id: t.Number(),
    }),
  })
  .patch("/:id", (body) => body, {
    body: t.Partial(userSchema),
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

export default users;
