'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import CartModal from "./CartModal"

const NavIcons = () => {

  const router = useRouter()

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)


  const isLoggedIn = false
  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login")
    }
    setIsProfileOpen(prev => !prev)
  }

  const handleCart = () => {
    setIsCartOpen(prev => !prev)
  }

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {/* profilo icon */}
      <Image src="/profile.png" alt="" width={22} height={22} className="cursor-pointer" onClick={handleProfile} />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 text-sm shadow-general z-20">
          <Link href="/">
            Profile
          </Link>
          <div className="mt-2 cursor-pointer">
            Logout
          </div>
        </div>
      )}

      {/* bell icon */}
      <Image src="/notification.png" alt="" width={22} height={22} className="cursor-pointer" />

      {/* shopping cart icon */}
      <div className="cursor-pointer relative">
        <Image src="/cart.png" alt="" width={22} height={22} onClick={handleCart} />
        <div className="absolute  -top-4 -right-4 w-6 h-6 bg-cartRed text-sm text-white flex items-center justify-center rounded-full">
          2
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  )
}

export default NavIcons