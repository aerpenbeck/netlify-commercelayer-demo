import type { Action, PageServerLoad } from './$types'
import { checkout } from '$lib/server/cart'
import { getOrder } from '$lib/server/order'

export const load = (async ({ cookies }) => {
    const orderId = getOrder(cookies.get('userid'))
    return {
        orderId,
    }
}) satisfies PageServerLoad

export const actions = {
    default: (async ({ cookies }) => {
        const orderId = await checkout(cookies.get('userid'))
        return {
            orderId,
        }
    }) satisfies Action,
}
