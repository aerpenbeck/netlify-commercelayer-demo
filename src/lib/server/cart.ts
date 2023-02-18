import type { Address, Cart, ProductType } from '$lib/types'
import { error } from '@sveltejs/kit'
import { saveOrder } from './order'
import { cl } from '$lib/server/clApi'
import type { Order } from '@commercelayer/sdk'

const cartDb = new Map<string, Cart>()

export function getCart(userId: string | undefined): Cart {
    if (!userId) {
        throw error(400)
    }
    let cart = cartDb.get(userId)
    if (!cart) {
        cart = {
            items: [],
        }
        cartDb.set(userId, cart)
    }
    return cart
}

export async function clearCart(userId: string | undefined): Promise<Cart> {
    if (!userId) {
        throw error(400)
    }
    const cart = getCart(userId)
    cart.items.length = 0
    // TODO delete cart/order
    // if (cart.id) {
    //     const client = await cl()
    //     client.orders.delete(cart.id)
    // }
    cartDb.set(userId, cart)
    return cart
}

export async function addToCart(
    userId: string | undefined,
    product: ProductType,
    quantity = 1
): Promise<Cart> {
    if (!userId) {
        throw error(400)
    }
    const cart = getCart(userId)
    cart.items.push({
        id: crypto.randomUUID(),
        sku: product.sku,
        title: product.title,
        quantity,
    })
    const client = await cl()
    let order: Order
    if (!cart.id) {
        order = await client.orders.create({})
        cart.id = order.id
        console.log(`Created new Order '${order.number}'`)
    } else {
        order = await client.orders.retrieve(cart.id)
        console.log(`Using Order '${order.number}'`)
    }
    await client.line_items.create({
        quantity,
        name: product.title,
        image_url: product.imgUrl,
        order: {
            type: 'orders',
            id: cart.id,
        },
        item: {
            type: 'skus',
            id: product.sku,
        },
    })
    return cart
}

export async function removeFromCart(
    userId: string | undefined,
    cartItemId: string | undefined
): Promise<Cart> {
    if (!userId || !cartItemId) {
        throw error(400)
    }
    const cart = getCart(userId)
    const index = cart.items.findIndex((item) => item.id === cartItemId)
    if (index !== -1) {
        cart.items.splice(index, 1)
    }
    return cart
}

export async function checkout(userId: string | undefined): Promise<string | undefined> {
    if (!userId) {
        throw error(400)
    }
    const cart = getCart(userId)
    if (cart.items.length > 0) {
        const cart = getCart(userId)
        const orderId = cart.id
        if (orderId) {
            saveOrder(userId, orderId)
            clearCart(userId)
        }
        return orderId
    } else {
        return undefined
    }
}

export async function setEmail(userId: string | undefined, email: string | undefined) {
    if (!userId || !email || email.trim().length === 0) {
        throw error(400)
    }
    const cart = getCart(userId)
    const orderId = cart.id
    if (orderId) {
        cart.email = email.trim()
        const client = await cl()
        await client.orders.update({
            id: orderId,
            customer_email: email.trim(),
        })
    }
}

export async function setAddress(userId: string | undefined, address: Address) {
    if (!userId) {
        throw error(400)
    }
    const cart = getCart(userId)
    const orderId = cart.id
    if (orderId) {
        cart.address = address
        const client = await cl()
        const clAddress = await client.addresses.create({
            first_name: address.firstName,
            last_name: address.lastName,
            city: address.city || '',
            zip_code: address.zipCode || '',
            line_1: address.street || '',
            country_code: address.countryCode || '',
            state_code: address.region || '',
            phone: address.phone || '',
        })
        await client.orders.update({
            id: orderId,
            billing_address: { id: clAddress.id, type: 'addresses' },
            _shipping_address_same_as_billing: true,
        })
    }
}
