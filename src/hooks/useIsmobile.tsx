import React, { useEffect, useState } from "react"

const useIsMobile = () => {
  const [isMobile, setIsMobile] =
    useState(Boolean)

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth < 767)
    window.addEventListener(
      "resize",
      handleResize
    )
    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      )
  }, [])

  return isMobile
}

export default useIsMobile
