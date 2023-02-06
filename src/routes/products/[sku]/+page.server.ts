import type { Action, PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { getFormValue } from '$lib/util'
import { loadProduct } from '$lib/server/data'
import { addToCart } from '$lib/server/cart'

export const load = (async ({ params }) => {
    const product = await loadProduct(params.sku)
    if (!product) {
        throw error(404)
    }
    return {
        product,
    }
}) satisfies PageServerLoad

export const actions = {
    addToCart: (async ({ cookies, request }) => {
        const data = await request.formData()
        const product = await loadProduct(getFormValue(data, 'sku'))
        if (!product) {
            throw error(404)
        }
        await addToCart(cookies.get('userid'), product)
    }) satisfies Action,
}
