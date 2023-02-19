import type { Action } from './$types'
import { checkout } from '$lib/server/cart'
import { redirect } from '@sveltejs/kit'

export const actions = {
    default: (async ({ cookies }) => {
        const orderNumber = await checkout(cookies.get('userid'))
        if (!orderNumber) {
            throw redirect(303, '/cart')
        }
        return {
            orderNumber,
        }
    }) satisfies Action,
}
