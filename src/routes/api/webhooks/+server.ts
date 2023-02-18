import { json } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import CryptoJS from 'crypto-js'
import hmacSHA256 from 'crypto-js/hmac-sha256'

export const POST: RequestHandler = async ({ request }) => {
    const signature = request.headers.get('x-commercelayer-signature')
    console.log(`Signature: ${signature}`)
    const hash = hmacSHA256(JSON.stringify(request.body), import.meta.env.VITE_CL_SHARED_SECRET)
    const encode = hash.toString(CryptoJS.enc.Base64)
    console.log(`Signature valid: ${encode === signature}`)
    const payload = await request.json()
    console.log(`Received ${payload.data?.id} of type ${payload.data?.type}`)
    return json('ok')
}
