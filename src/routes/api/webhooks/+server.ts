import { json } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import CryptoJS from 'crypto-js'
import hmacSHA256 from 'crypto-js/hmac-sha256'

export const POST: RequestHandler = async ({ request }) => {
    const signature = request.headers.get('x-commercelayer-signature') || ''
    const rawBodyText = await request.text()

    const hash = hmacSHA256(rawBodyText, import.meta.env.VITE_CL_SHARED_SECRET)
    const encode = hash.toString(CryptoJS.enc.Base64)
    const validSignature = encode === signature
    //console.debug(`Signature '${signature}' is valid: ${validSignature}`)
    if (!validSignature) {
        return json('Invalid signature', { status: 401, statusText: 'Unauthorized' })
    }
    const body = JSON.parse(rawBodyText)
    const eventData = body.data
    console.log(`Received ${eventData.id} of type ${eventData.type}`)

    return json('ok')
}
