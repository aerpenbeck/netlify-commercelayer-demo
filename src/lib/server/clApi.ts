import { getRefreshToken, getSalesChannelToken } from '@commercelayer/js-auth'
import { CommerceLayer, type CommerceLayerClient } from '@commercelayer/sdk'
import { MARKET_ID, ORGANIZATION } from './constants'

// console.log(`MODE=${import.meta.env.MODE}`)
// console.log(`PROD=${import.meta.env.PROD}`)
// console.log(`DEV=${import.meta.env.DEV}`)

let accessToken: string
let refreshToken: string | undefined
let expires: Date | undefined

export async function cl(): Promise<CommerceLayerClient> {
    if (!accessToken) {
        const token = await getSalesChannelToken({
            clientId: import.meta.env.VITE_CL_CLIENT_ID,
            endpoint: import.meta.env.VITE_CL_BASE_URL,
            scope: `market:${MARKET_ID}`,
        })

        if (!token || !token?.accessToken) {
            return Promise.reject('Could not obtain Commerce Layer access token')
        }

        accessToken = token.accessToken
        refreshToken = token.refreshToken
        expires = token.expires
    }

    if (expires && Math.abs(expires.getTime() - Date.now()) / 1000 <= 10) {
        if (refreshToken) {
            const token = await getRefreshToken({
                clientId: import.meta.env.VITE_CL_CLIENT_ID,
                endpoint: import.meta.env.VITE_CL_BASE_URL,
                scope: `market:${MARKET_ID}`,
                refreshToken,
            })
            if (!token || !token?.accessToken) {
                return Promise.reject('Could not refresh Commerce Layer access token')
            }

            accessToken = token.accessToken
            refreshToken = token.refreshToken
            expires = token.expires
        } else {
            return Promise.reject('Could not refresh Commerce Layer access token')
        }
    }

    return CommerceLayer({
        organization: ORGANIZATION,
        accessToken: accessToken,
    })
}
