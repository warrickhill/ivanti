import { Elysia } from "elysia"
import { swagger } from "@elysiajs/swagger"
import { dishes, ratings, users } from "./routes"

const app = new Elysia()
    .use(swagger())
    .use(dishes)
    .use(users)
    .use(ratings)
    .listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
