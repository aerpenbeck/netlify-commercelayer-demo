import type { Action, PageServerLoad } from './$types'
import { getFormValue } from '$lib/util'
import type { Address } from '$lib/types'
import { clearCart, removeFromCart, setAddress, setEmail, setShippingMethod, getShippingMethods } from '$lib/server/cart'

export const load = (async ({ cookies }) => {
    const shippingMethods = await getShippingMethods(cookies.get('userid'))
    return {
        shippingMethods,
    }
}) satisfies PageServerLoad

export const actions = {
    removeFromCart: (async ({ cookies, request }) => {
        const data = await request.formData()
        await removeFromCart(cookies.get('userid'), getFormValue(data, 'id'))
    }) satisfies Action,
    clearCart: (async ({ cookies }) => {
        await clearCart(cookies.get('userid'))
    }) satisfies Action,
    setEmail: (async ({ cookies, request }) => {
        const data = await request.formData()
        await setEmail(cookies.get('userid'), getFormValue(data, 'email-address'))
    }) satisfies Action,
    setShippingMethod: (async ({ cookies, request }) => {
        const data = await request.formData()
        await setShippingMethod(cookies.get('userid'), getFormValue(data, 'shipment-id'), getFormValue(data, 'shipping-method'))
        return { shippingMethodSelected: true }
    }) satisfies Action,
    setAddress: (async ({ cookies, request }) => {
        const data = await request.formData()
        const address: Address = {
            firstName: getFormValue(data, 'first-name'),
            lastName: getFormValue(data, 'last-name'),
            street: getFormValue(data, 'street-address'),
            city: getFormValue(data, 'city'),
            region: getFormValue(data, 'region'),
            zipCode: getFormValue(data, 'postal-code'),
            countryCode: getFormValue(data, 'country'),
            phone: getFormValue(data, 'phone'),
        }
        await setAddress(cookies.get('userid'), address)
    }) satisfies Action,
}
