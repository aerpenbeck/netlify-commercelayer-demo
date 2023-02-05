import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { loadProduct } from '$lib/server/data'

export const load = (async ({ params }) => {
    const product = await loadProduct(params.sku)
    if (!product) {
        throw error(404)
    }
    return {
        product,
    }
}) satisfies PageServerLoad
