import type { PageServerLoad } from './$types';
import { products } from "./data";

export const load = (async () => {
    return {
        summaries: products.map((product) => ({
            sku: product.sku,
            title: product.title
        }))
    };
}) satisfies PageServerLoad;