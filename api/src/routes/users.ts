import { Elysia, t } from "elysia"
import ratings from "./ratings"
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} from "../repositories/users"

enum UserType {
    admin = "Admin",
    customer = "Customer",
}

const userSchema = t.Object({
    id: t.Optional(t.Integer()),
    type: t.Enum(UserType),
    username: t.String(),
    password: t.String(),
    email: t.String({ format: "email" }),
    contactNumber: t.String(),
    isBlocked: t.Optional(t.Boolean()),
})

export const users = new Elysia({ prefix: "/users" })
    .get("/", () => getUsers())
    .post("/", ({ body }) => createUser(body), {
        body: userSchema,
    })
    .get("/:id", ({ params: { id } }) => getUser(id), {
        params: t.Object({
            id: t.Number(),
        }),
    })
    .put("/:id", ({ params: { id }, body }) => updateUser(id, body), {
        body: userSchema,
        params: t.Object({
            id: t.Number(),
        }),
    })
    .patch("/:id", ({ params: { id }, body }) => updateUser(id, body), {
        body: t.Partial(userSchema),
        params: t.Object({
            id: t.Number(),
        }),
    })
    .delete("/:id", ({ params: { id } }) => deleteUser(id), {
        params: t.Object({
            id: t.Number(),
        }),
    })

export default users
