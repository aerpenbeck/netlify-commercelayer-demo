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
    email?: string;
    address?: Address;
}

export type Address = {
    firstName?: string;
    lastName?: string;
    street?: string;
    city?: string;
    region?: string;
    zipCode?: string;
    countryCode?: string;
    phone?: string;
}
