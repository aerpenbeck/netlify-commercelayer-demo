import type { Action } from './$types'
import { getFormValue } from '$lib/util'
import { clearCart, removeFromCart } from '$lib/server/cart'

export const actions = {
    removeFromCart: (async ({ cookies, request }) => {
        const data = await request.formData()
        removeFromCart(cookies.get('userid'), getFormValue(data, 'id'))
    }) satisfies Action,
    clearCart: (async ({ cookies }) => {
        clearCart(cookies.get('userid'))
    }) satisfies Action,
}
