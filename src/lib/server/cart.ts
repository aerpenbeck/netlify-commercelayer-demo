import type { Cart } from '$lib/types'
import { error } from '@sveltejs/kit'
import { saveOrder } from './order'
// import { cl } from '$lib/server/clApi'

const cartDb = new Map<string, Cart>()

export function getCart(userId: string | undefined): Cart {
    if (!userId) {
        throw error(400)
    }
    let cart = cartDb.get(userId)
    if (!cart) {
        cart = []
        cartDb.set(userId, cart)
    }
    return cart
}

export function clearCart(userId: string | undefined): Cart {
    if (!userId) {
        throw error(400)
    }
    const cart = getCart(userId)
    cart.length = 0
    cartDb.set(userId, cart)
    return cart
}

export function addToCart(
    userId: string | undefined,
    sku: string | undefined,
    title: string | undefined,
    quantity = 1
): Cart {
    if (!userId || !sku || !title) {
        throw error(400)
    }
    const cart = getCart(userId)
    cart.push({
        id: crypto.randomUUID(),
        sku,
        title,
        quantity,
    })
    return cart
}

export function removeFromCart(userId: string | undefined, cartItemId: string | undefined): Cart {
    if (!userId || !cartItemId) {
        throw error(400)
    }
    const cart = getCart(userId)
    const index = cart.findIndex((item) => item.id === cartItemId)
    if (index !== -1) {
        cart.splice(index, 1)
    }
    return cart
}

export async function checkout(userId: string | undefined): Promise<string | undefined> {
    if (!userId) {
        throw error(400)
    }
    const cart = getCart(userId)
    if (cart.length > 0) {
        console.log(`TODO create Commerce Layer cart and place order for '${userId}`)
        // const client = await cl()
        // TODO client.orders.create()
        const orderId = crypto.randomUUID()
        saveOrder(userId, orderId)
        clearCart(userId)
        return orderId
    } else {
        return undefined
    }
}
