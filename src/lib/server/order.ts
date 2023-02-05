import { error } from '@sveltejs/kit'

const orderDb = new Map<string, string>()

export function getOrder(userId: string | undefined): string | undefined {
    if (!userId) {
        throw error(400)
    }
    return orderDb.get(userId)
}

export function saveOrder(userId: string | undefined, orderId: string): void {
    if (!userId) {
        throw error(400)
    }
    orderDb.set(userId, orderId)
}
