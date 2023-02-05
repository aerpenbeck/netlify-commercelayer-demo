import type { Sku } from '@commercelayer/sdk/lib/cjs/model'
import type { ProductType } from './types'
import { cl } from '../clApi'

export async function loadProducts(): Promise<ProductType[]> {
    const client = await cl()
    const products = await client.skus.list()
    return products.map((product) => mapSku(product))
}

export async function loadProduct(id: string): Promise<ProductType | undefined> {
    const client = await cl()
    const product = await client.skus.retrieve(id, { include: ['prices'] })
    if (!product) {
        return undefined
    }
    return mapSku(product)
}

function mapSku(sku: Sku): ProductType {
    return {
        sku: sku.id,
        title: sku.name,
        description: sku.description,
        imgUrl: sku.image_url,
        price: sku.prices?.[0].formatted_amount,
    } as ProductType
}
