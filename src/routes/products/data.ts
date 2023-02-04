export const products: ProductType[] = [
    {
        sku: "4711",
        title: "Fancy Shirt",
        description: "Bright colors and very comfortable",
    },
    {
        sku: "6969",
        title: "Must-have Bag",
        description: "Room for all your stuff",
    }
]

export type ProductType = {
    sku: string;
    title: string;
    description?: string;
}