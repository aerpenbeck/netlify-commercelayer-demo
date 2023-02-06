export type ProductType = {
    sku: string
    title: string
    price: string
    color?: string
    description?: string
    imgUrl?: string
}

export type CartItem = {
    id: string
    title: string
    sku: string
    quantity: number
}

export type Cart = {
    id?: string;
    items: CartItem[];
}
