"use client"

import { products } from "@wix/stores"
import { useEffect, useState } from "react"
import Add from "./Add"


const CustomeizeProducts = ({
  productId,
  variants,
  productOption,
}: {
  productId: string,
  variants: products.Variant[],
  productOption: products.ProductOption[]
}) => {

  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({})


  const handleOptionSelect = (optionType: string | undefined, choice: string | undefined) => {
    if (optionType !== undefined && choice !== undefined) {
      setSelectedOptions(prev => ({ ...prev, [optionType]: choice }))
    }
  }

  const checkInstock = variants.filter(variant =>
    variant.stock?.inStock && variant.stock?.quantity! > 0
  )

  const isVariantInStock = (choices: { [key: string]: string }) => {

    return checkInstock.some(variant => {
      const variantChoices = variant.choices
      if (!variantChoices) return false
      return Object.entries(choices).every(([key, value]: [string, string]) => variantChoices[key] === value)
    })
  }


  useEffect(() => {
    if (Object.keys(selectedOptions).length === 0) {
      setSelectedOptions({ "Color": checkInstock[0]?.choices?.Color! })
    }
  }, [])



  return (
    <>

      <div className="flex flex-col gap-6">
        {productOption?.map((option: products.ProductOption) => (
          <div key={option.name} className="flex flex-col gap-4">
            <h4 className="font-medium">Choose a {option.name}</h4>
            <ul className="flex items-center gap-3">
              {option.choices?.map((choice) => {
                const disabled: boolean = !isVariantInStock({
                  ...selectedOptions,
                  [option.name!]: choice.description
                } as optionSelecteDisable)
                const selected = selectedOptions[option.name!] === choice.description

                const clickHandler = disabled ? undefined : () => handleOptionSelect(option.name, choice.description)
                return option.name === "Color" ? (
                  <li key={choice.value} className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative"
                    style={{ backgroundColor: choice.value, cursor: disabled ? "not-allowed" : "pointer" }}
                    onClick={clickHandler}
                  >
                    {selected && <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
                    {disabled && <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
                  </li>
                ) : (
                  <li key={choice.value} className="ring-1 ring-cartRed text-cartRed rounded-md py-1 px-4 text-sm "
                    style={{ cursor: disabled ? "not-allowed" : "pointer", backgroundColor: selected ? "#f35c7a" : disabled ? "#FBCFE8" : "white", color: selected || disabled ? "white" : "#f35c7a", boxShadow: disabled ? "none" : "" }}
                    onClick={clickHandler}
                  >
                    {choice.description}
                  </li>
                )
              })}
            </ul>
          </div>
        ))
        }

      </div>

      <Add variants={variants} />
    </>
  )
}

export default CustomeizeProducts
