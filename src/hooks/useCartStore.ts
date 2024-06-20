import { create } from "zustand"
import { WixClient } from "@/context/wixContext"
import { currentCart } from "@wix/ecom"

type CartState = {
  cart: any
  isLoading: boolean
  counter: number
  getCart: (wixClient: WixClient) => void
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void
  removeItem: (wixClient: WixClient, itemId: string) => void
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: true,
  counter: 0,
  getCart: async (wixClient) => {
    try {
      const cart =
        await wixClient.currentCart.getCurrentCart()
      set({
        cart: cart || [],
        isLoading: false,
        counter: cart?.lineItems.length || 0,
      })
    } catch (err) {
      set((prev) => ({ ...prev, isLoading: false }))
    }
  },
  addItem: async (
    wixClient,
    productId,
    variantId,
    quantity
  ) => {
    set((state) => ({ ...state, isLoading: true }))
    const responseObj =
      await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_WIX_STORE_ID!,
              catalogItemId: productId,
              ...(variantId && { options: { variantId } }),
            },
            quantity: quantity,
          },
        ],
      })

    set({
      cart: responseObj.cart,
      counter: responseObj.cart?.lineItems.length,
      isLoading: false,
    })
  },
  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }))
    const responseObj =
      await wixClient.currentCart.removeLineItemsFromCurrentCart(
        [itemId]
      )

    set({
      cart: responseObj.cart,
      counter: responseObj.cart?.lineItems.length,
      isLoading: false,
    })
  },
}))
