import type { Address, Cart, PaymentMethod, ProductType, ShippingMethod } from '$lib/types'
import { error } from '@sveltejs/kit'
import { saveOrder } from './order'
import { cl } from '$lib/server/clApi'
import type {
    Order,
    PaymentMethod as CLPaymentMethod,
    ShippingMethod as CLShippingMethod,
} from '@commercelayer/sdk'

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
    cart.paymentMethodSelected = false
    cart.shippingMethodSelected = false
    cart.address = undefined
    cart.email = undefined
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
        console.log(`Created new Order '${order.number}' (${order.id})`)
    } else {
        order = await client.orders.retrieve(cart.id)
        console.log(`Using Order '${order.number}' (${order.id})`)
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

export async function checkout(userId: string | undefined): Promise<number | undefined> {
    if (!userId) {
        throw error(400)
    }
    const cart = getCart(userId)
    if (validForPlacement(cart)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const orderId = cart.id!
        console.log(`Placing order ${orderId}`)
        const client = await cl()
        const order = await client.orders.update({
            id: orderId,
            _place: true,
        })
        saveOrder(userId, orderId)
        clearCart(userId)
        return order.number
    } else {
        return undefined
    }
}

// TODO assertion function
function validForPlacement(cart: Cart): boolean {
    return (
        cart.items.length > 0 &&
        cart.email !== undefined &&
        cart.address !== undefined &&
        cart.paymentMethodSelected === true &&
        cart.shippingMethodSelected === true &&
        cart.id !== undefined
    )
}

export async function setEmail(userId: string | undefined, email: string | undefined) {
    if (!userId || !email || email.trim().length === 0) {
        throw error(400)
    }
    const cart = getCart(userId)
    const orderId = cart.id
    if (orderId) {
        cart.email = email.trim()
        console.log(`Setting customer email for order ${orderId}`)
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
        console.log(`Setting billing address for order ${orderId}`)
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

export async function getShippingMethods(userId: string | undefined): Promise<ShippingMethod[]> {
    if (!userId) {
        throw error(400)
    }
    const cart = getCart(userId)
    const orderId = cart.id
    if (orderId && cart.address) {
        const client = await cl()
        const shipments = await client.orders.shipments(orderId, {
            include: ['available_shipping_methods', 'stock_location'],
        })
        if (shipments.length > 0) {
            // TODO map shipping methods for all shippings
            const shipment = shipments.get(0)
            if (shipment) {
                return (
                    shipment.available_shipping_methods?.map((sm) =>
                        mapShippingMethod(shipment.id, sm)
                    ) || []
                )
            }
        }
    }
    return []
}

export async function getPaymentMethods(userId: string | undefined): Promise<PaymentMethod[]> {
    if (!userId) {
        throw error(400)
    }
    const cart = getCart(userId)
    const orderId = cart.id
    if (orderId) {
        const client = await cl()
        const order = await client.orders.retrieve(orderId, {
            include: ['available_payment_methods'],
        })
        if (order.available_payment_methods) {
            return order.available_payment_methods.map((pm) => mapPaymentMethod(pm))
        }
    }
    return []
}

function mapShippingMethod(shipmentId: string, shippingMethod: CLShippingMethod): ShippingMethod {
    return {
        id: shippingMethod.id,
        name: shippingMethod.name || '',
        price: shippingMethod.formatted_price_amount || '',
        shipmentId,
    }
}

function mapPaymentMethod(paymentMethod: CLPaymentMethod): PaymentMethod {
    return {
        id: paymentMethod.id,
        name: paymentMethod.name || '',
    }
}

export async function setShippingMethod(
    userId: string | undefined,
    shipmentId: string | undefined,
    shippingMethodId: string | undefined
) {
    if (!userId || !shipmentId || !shippingMethodId) {
        throw error(400)
    }
    const cart = getCart(userId)
    const orderId = cart.id
    if (orderId) {
        console.log(`Setting shipping method ${shippingMethodId} for shipment ${shipmentId}`)
        const client = await cl()
        await client.shipments.update({
            id: shipmentId,
            shipping_method: {
                id: shippingMethodId,
                type: 'shipping_methods',
            },
        })
        cart.shippingMethodSelected = true
    }
}

export async function setPaymentMethod(
    userId: string | undefined,
    paymentMethodId: string | undefined
) {
    if (!userId || !paymentMethodId) {
        throw error(400)
    }
    const cart = getCart(userId)
    const orderId = cart.id
    if (orderId) {
        console.log(`Setting payment method ${paymentMethodId} for order ${orderId}`)
        const client = await cl()
        const order = await client.orders.update(
            {
                id: orderId,
                payment_method: { id: paymentMethodId, type: 'payment_methods' },
            },
            { include: ['payment_method'] }
        )
        if (order.payment_method?.payment_source_type === 'wire_transfers') {
            console.log(`Creating wire transfer payment source for order ${orderId}`)
            await client.wire_transfers.create({
                order: {
                    id: orderId,
                    type: 'orders',
                },
            })
        }
        cart.paymentMethodSelected = true
    }
}
