"use client"

import Image from "next/image"

const CartModal = () => {

  const carItems = true

  return (
    // w-max === maximum content
    <div className="w-max absolute p-4 rounded-md shadow-general bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!carItems ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* cart list */}
          <div className="flex flex-col gap-8">
            {/* item */}
            <div className="flex gap-4">
              <Image
                src="/backpack.jpg"
                alt=""
                width={72}
                height={96}
                className="rounded-md object-cover"
              />
              <div className="flex flex-col justify-between w-full">
                {/* top */}
                <div>
                  {/* title */}
                  <div className="flex items-center justify-center gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">$40</div>
                  </div>
                  {/* desc */}
                  <div className="text-sm text-gray-500">
                    avaiable
                  </div>
                </div>
                {/* bottom */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. 2</span>
                  <span className="text-blue-500">Remove</span>
                </div>
              </div>
            </div>
            {/* item */}
            <div className="flex gap-4">
              <Image
                src="/backpack.jpg"
                alt=""
                width={72}
                height={96}
                className="rounded-md object-cover"
              />
              <div className="flex flex-col justify-between w-full">
                {/* top */}
                <div>
                  {/* title */}
                  <div className="flex items-center justify-center gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">$40</div>
                  </div>
                  {/* desc */}
                  <div className="text-sm text-gray-500">
                    avaiable
                  </div>
                </div>
                {/* bottom */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. 2</span>
                  <span className="text-blue-500">Remove</span>
                </div>
              </div>
            </div>
          </div>
          {/* subtotal  */}
          <div>
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>$49</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">View Cart</button>
              <button className="rounded-md py-3 px-4 bg-black text-white">Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CartModal