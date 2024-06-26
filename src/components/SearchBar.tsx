"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"


const SearchBar = () => {

  const router = useRouter()

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const formData = new FormData(e.currentTarget)
    // const name = formData.get("search") as string

    const name = (event.currentTarget.elements.namedItem("search") as HTMLInputElement)?.value

    if (name) {
      router.push(`/list?name=${name}`)
    }
  }

  return (
    <form className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1" onSubmit={handleSearch}>
      <input type="text" name="search" placeholder="Search" className="flex-1 bg-transparent outline-none" />
      <button className="sursor-pointer">
        <Image
          src='/search.png'
          alt=""
          width={16}
          height={16}
        />
      </button>
    </form>
  )
}

export default SearchBar