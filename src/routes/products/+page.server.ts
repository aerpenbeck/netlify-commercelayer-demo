import type { PageServerLoad } from './$types';
import { products } from "./data";

export const load = (async () => {
    return {
        summaries: products.map((product) => ({
            sku: product.sku,
            title: product.title,
            imgUrl: product.imgUrl,
            color: product.color,
            price: product.price,
        }))
    };
}) satisfies PageServerLoad;