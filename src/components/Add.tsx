"use client"

import { useState } from "react"
import { products } from "@wix/stores"

// const Add = ({
//   stockNumber,
//   inStock,
//   trackInventory,
//   variants
// }: {
//   inStock?: boolean
//   trackInventory?: boolean
//   stockNumber: number | null
//   variants?: any[]
// }) => {
const Add = ({
  variants,
  selected
}: {
  variants?: products.Variant[],
  selected?: { [key: string]: string }
}) => {

  let trackInventory: any
  let stockNumber: any
  let inStock: any


  if (variants?.length === 1) {
    trackInventory = variants[0].stock?.trackQuantity
    stockNumber = variants[0].stock?.quantity
    inStock = variants[0].stock?.inStock
  } else {
    variants?.find((product) => {
      const { Color, Size } = product.choices!
      const stock = product.stock
      // console.log(Color)
      // console.log(Size)
      if (selected?.Color === Color && selected.Size === Size) {
        trackInventory = stock?.trackQuantity
        stockNumber = stock?.quantity
        inStock = stock?.inStock
      }
    })
  }

  // console.log(trackInventory)
  // console.log(stockNumber)
  // console.log(inStock)



  // trackQuantity === false 
  // stock: {trackQuantity: false, quantity: 0, inStock: false}
  // stock: { trackQuantity: false, inStock: true }

  // trackQuantity === true
  // stock: {trackQuantity: true, quantity: 20, inStock: true}
  // stock: {trackQuantity: true, quantity: 0, inStock: false}



  const [quantity, setQuantity] = useState(1)

  const handleQuantity = (type: "decrese" | "increse") => {

    if (type === "decrese" && quantity > 1) {
      setQuantity(prev => prev - 1)
    }

    if (type === "increse" && stockNumber !== null && quantity < stockNumber) {
      setQuantity(prev => prev + 1)
    }

    if (type === "increse" && trackInventory === false && inStock === true) {
      setQuantity(prev => prev + 1)
    }

  }


  const disabled = stockNumber ? (trackInventory === true && (stockNumber <= 0)) : (trackInventory === false && inStock === false || trackInventory === true && inStock === false)



  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          {!disabled ?
            <div className={`bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32  ${disabled ? "hover:cursor-not-allowed" : ""}`}>
              <button className={`cursor-pointer text-xl  ${disabled ? "hover:cursor-not-allowed" : ""}`} onClick={() => handleQuantity("decrese")} disabled={disabled}>-</button>
              {quantity}
              <button className={`cursor-pointer text-xl  ${disabled ? "hover:cursor-not-allowed" : ""}`} onClick={() => handleQuantity("increse")} disabled={disabled}>+</button>
            </div> : ""
          }

          {disabled ? (<div className="text-xs">
            Out of Stock
          </div>) : stockNumber && stockNumber <= 10 ? (
            <div className="text-xs">
              <div className="text-xs">Only <span className="text-orange-500">{stockNumber} items</span> left! <br />{"Don't"}{" "} miss it</div>
            </div>
          ) : (
            ""
          )}

        </div>

        <button className="w-36 text-sm rounded-3xl ring-1 ring-cartRed text-cartRed py-2 px-4 hover:bg-cartRed hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-0" disabled={disabled}>Add to Cart</button>
      </div>
    </div>
  )
}

export default Add