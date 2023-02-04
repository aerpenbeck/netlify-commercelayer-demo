import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { products } from "../data";

export const load = (async ({ params }) => {
    const product = products.find((product) => product.sku == params.sku)
    if (!product) {
        throw error(404);
    }
    return {
        product
    };
}) satisfies PageServerLoad;