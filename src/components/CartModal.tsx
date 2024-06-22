"use client"

import { useCartStore } from "@/hooks/useCartStore"
import useWixClient from "@/hooks/useWixClient"
import { media } from "@wix/sdk"
import Image from "next/image"
import { useEffect } from "react"

const CartModal = () => {

  const wixClient = useWixClient()
  const { cart, isLoading, removeItem } = useCartStore()


  return (
    // w-max === maximum content
    <div className="w-max absolute p-4 rounded-md shadow-general bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cart.lineItems ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* cart list */}
          <div className="flex flex-col gap-8">
            {/* item */}
            {cart.lineItems.map((item: any) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && <Image
                  src={media.getScaledToFillImageUrl(item.image, 72, 96, {})}
                  alt=""
                  width={72}
                  height={96}
                  className="rounded-md object-cover"
                />}
                <div className="flex flex-col justify-between w-full">
                  {/* top */}
                  <div>
                    {/* title */}
                    <div className="flex items-center justify-center gap-8">
                      <h3 className="font-semibold">{item.productName?.original}</h3>
                      <div className="p-1 bg-gray-50 rounded-sm">
                        CAD $ {item.price?.amount}
                      </div>
                    </div>
                    {/* desc */}
                    <div className="text-sm text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                  {/* bottom */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-blue-500"
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >Remove</span>
                  </div>
                </div>
              </div>
            ))}

          </div>
          {/* subtotal  */}
          <div>
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>${cart?.subtotal?.amount}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">View Cart</button>
              <button className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75" disabled={isLoading}>Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CartModal