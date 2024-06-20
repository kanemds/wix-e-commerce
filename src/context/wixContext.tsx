"use client"
import { createClient, OAuthStrategy } from "@wix/sdk"

import { products, collections } from "@wix/stores"
import Cookies from "js-cookie"
import { createContext, ReactNode } from "react"
import { currentCart } from "@wix/ecom"


// use this to get cookies from client side
const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}") // store in HTTP-only cookies can protected from XSS attacks


const wixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT!,
    tokens: {
      refreshToken,
      accessToken: { value: "", expiresAt: 0 }
    }
  })
})

export type WixClient = typeof wixClient

export const WixClientContext = createContext<WixClient>(wixClient)

export const WixClientContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <WixClientContext.Provider value={wixClient}>
      {children}
    </WixClientContext.Provider>
  )
}
