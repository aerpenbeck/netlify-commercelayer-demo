import type { LayoutServerLoad } from './$types'
import { getCart } from '$lib/server/cart'

export const load = (async ({ cookies }) => {
    let id = cookies.get('userid')

    if (!id) {
        id = crypto.randomUUID()
        cookies.set('userid', id, { path: '/' })
    }

    return {
        cart: getCart(id),
    }
}) satisfies LayoutServerLoad
