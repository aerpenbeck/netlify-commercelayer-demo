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
    color?: string;
    description?: string;
    imgUrl?: string;
    price: number;
}