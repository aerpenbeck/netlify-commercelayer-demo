import { json } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import CryptoJS from 'crypto-js'
import hmacSHA256 from 'crypto-js/hmac-sha256'

export const POST: RequestHandler = async ({ request }) => {
    const signature = request.headers.get('x-commercelayer-signature') || ''
    console.log(`Signature: ${signature}`)
    const rawBodyText = await request.text()

    const hash = hmacSHA256(JSON.stringify(rawBodyText), import.meta.env.VITE_CL_SHARED_SECRET)
    const encode = hash.toString(CryptoJS.enc.Base64)
    const validSignature = encode === signature
    console.log(`Signature valid: ${validSignature}`)

    const hash2 = hmacSHA256(rawBodyText, import.meta.env.VITE_CL_SHARED_SECRET)
    const encode2 = hash2.toString(CryptoJS.enc.Base64)
    const validSignature2 = encode2 === signature
    console.log(`Signature valid: ${validSignature2}`)

    const body = JSON.parse(rawBodyText)
    const eventData = body.data
    console.log(`Received ${eventData.id} of type ${eventData.type}`)
    return json('ok')
}
