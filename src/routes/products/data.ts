import { getSalesChannelToken  } from '@commercelayer/js-auth';
import { CommerceLayer } from '@commercelayer/sdk';
import type { Sku } from '@commercelayer/sdk/lib/cjs/model';
import { error } from '@sveltejs/kit';

console.log(`MODE=${import.meta.env.MODE}`);
console.log(`PROD=${import.meta.env.PROD}`);
console.log(`DEV=${import.meta.env.DEV}`);
// console.log(`VITE_CLIENT_ID=${import.meta.env.VITE_CL_CLIENT_ID}`);
// console.log(`VITE_CL_BASE_URL=${import.meta.env.VITE_CL_BASE_URL}`);

const organization = 'future-shopping';
const marketId = 12514;

const token = await getSalesChannelToken({
    clientId: import.meta.env.VITE_CL_CLIENT_ID,
    endpoint: import.meta.env.VITE_CL_BASE_URL,
    scope: `market:${marketId}`,
});

if (!token?.accessToken) {
    throw error(401);
}

// console.log('My access token: ', token.accessToken)
// console.log('Expiration date: ', token?.expires)

const cl = CommerceLayer({
  organization: organization,
  accessToken: token.accessToken
})

export async function loadProducts(): Promise<ProductType[]> {
    const products = await cl.skus.list();
    return products.map((product) => mapSku(product));
}

export async function loadProduct(id: string): Promise<ProductType | undefined> {
    const product = await cl.skus.retrieve(id, {include: ['prices']});
    if (!product) {
        return undefined;
    }
    return mapSku(product);
}

function mapSku(sku: Sku): ProductType {
    return {
        sku: sku.id,
        title: sku.name,
        description: sku.description,
        imgUrl: sku.image_url,
        price: sku.prices?.[0].formatted_amount,
    } as ProductType;
}

export const products: ProductType[] = [
    {
        sku: "4711",
        title: "Basic Tee",
        color: "Black",
        description: "Bright colors and very comfortable",
        imgUrl: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
        price: 35.00,
    },
    {
        sku: "6969",
        title: "Basic Tee",
        color: "Aspen White",
        description: "Plain and simple",
        imgUrl: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
        price: 35.00,
    },
    {
        sku: "1234",
        title: "Basic Tee",
        color: "Charcoal",
        description: "Fits everywhere",
        imgUrl: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
        price: 35.00,
    }
]

export type ProductType = {
    sku: string;
    title: string;
    price: string;
    color?: string;
    description?: string;
    imgUrl?: string;
}
