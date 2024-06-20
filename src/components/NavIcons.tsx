'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CartModal from "./CartModal"
import useWixClient from "@/hooks/useWixClient"
import Cookies from "js-cookie"
import { useCartStore } from "@/hooks/useCartStore"

const NavIcons = () => {

  const router = useRouter()

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()


  const wixClient = useWixClient()
  const isLoggedIn = wixClient.auth.loggedIn()
  const { cart, counter, getCart } = useCartStore()

  useEffect(() => {
    getCart(wixClient)
  }, [wixClient, getCart])

  if (isLoggedIn) {
    router.push("/")
  }


  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login")
    } else {
      setIsProfileOpen(prev => !prev)
    }
  }

  const handleCart = () => {
    setIsCartOpen(prev => !prev)
  }



  const handleLogout = async () => {
    setIsLoading(true)
    Cookies.remove("refreshToken")
    const { logoutUrl } = await wixClient.auth.logout(window.location.href) // not pathname needs full 
    setIsLoading(false)
    setIsProfileOpen(false)
    router.push(logoutUrl)

  }

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {/* profilo icon */}
      <Image src="/profile.png" alt="" width={22} height={22} className="cursor-pointer" onClick={handleProfile} />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 text-sm shadow-general z-20 bg-white w-max">
          <Link href="/">
            Profile
          </Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "logging out" : "Logout"}
          </div>
        </div>
      )}

      {/* bell icon */}
      <Image src="/notification.png" alt="" width={22} height={22} className="cursor-pointer" />

      {/* shopping cart icon */}
      <div className="cursor-pointer relative" onClick={handleCart} >
        <Image src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute  -top-4 -right-4 w-6 h-6 bg-cartRed text-sm text-white flex items-center justify-center rounded-full">
          {counter}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  )
}

export default NavIcons