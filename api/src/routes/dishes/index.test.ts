// test/index.test.ts
import { describe, expect, it } from 'bun:test'
import { Elysia } from 'elysia'
import dishes from '.'
import { edenTreaty } from '@elysiajs/eden'

const app = new Elysia().use(dishes).listen(3001)
const api = edenTreaty<typeof app>('http://localhost:3001')

describe('Elysia', () => {
    it('return an array of dishes', async () => {
        const { data } = await api.dishes.get()

        expect(data.length).toBe(96)
    })
    it('return an dish', async () => {
        const { data } = await api.dishes[1].get()
        
        expect(data).toMatchSnapshot()
    })
})