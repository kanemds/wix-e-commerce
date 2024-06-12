import { WixClientContext } from "@/context/wixContext"
import React, { useContext } from "react"

const useWixClient = () => {
  return useContext(WixClientContext)
}

export default useWixClient
