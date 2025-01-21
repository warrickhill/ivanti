// test/index.test.ts
import { describe, expect, it } from "bun:test"
import { Elysia } from "elysia"
import dishes from "."
import { edenTreaty } from "@elysiajs/eden"

const app = new Elysia().use(dishes).listen(3001)
const api = edenTreaty<typeof app>("http://localhost:3001")

describe("Dishes", () => {
    it("return an array of dishes", async () => {
        const { data } = await api.dishes.get()

        expect(data.length).toBe(96)
    })

    it("return an dish", async () => {
        const { data } = await api.dishes[1].get()

        expect(data).toMatchSnapshot()
    })

    it("creates, updates and deletes a dish", async () => {
        const { data } = await api.dishes.post({
            name: "Test Dish",
            description: `The name name says it all`,
            image: "https://fakeimg.pl/600x400",
            price: 10.99,
        })
        expect(data?.name).toBe("Test Dish")

        const { data: updated } = await api.dishes[data.id].patch({
            name: "Updated test dish",
        })

        expect(updated?.name).toBe("Updated test dish")

        const { data: deleted } = await api.dishes[data.id].delete()

        expect(deleted.lastInsertRowid).toBe(data.id)
    })
})
