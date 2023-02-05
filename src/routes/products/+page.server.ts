import type { PageServerLoad } from './$types'
import { loadProducts } from './data'

export const load = (async () => {
	return {
		summaries: (await loadProducts()).map((product) => ({
			sku: product.sku,
			title: product.title,
			imgUrl: product.imgUrl,
			color: product.color,
			price: product.price,
		})),
	}
}) satisfies PageServerLoad
