"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"


const Filter = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()



  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target
    const params = new URLSearchParams(searchParams)

    if (value.trim() === '') {
      params.delete(name) // Delete the key if value is empty or whitespace
    } else {
      params.set(name, value) // Set the parameter with non-empty value
    }
    replace(`${pathname}?${params.toString()}`)
  }



  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <select
          name="type"
          id=""
          className="  py-2 px-4 rounded-2xl text-xs font-medium bg-gray-100 "
          onChange={handleFilterChange}
        >
          <option value="">Type</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        {/* TODO: Filter Categories */}
        <select
          name="cat"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-100"
          onChange={handleFilterChange}
        >
          <option value="">Category</option>
          <option value="new arrival">New Arrival</option>
          <option value="popular">Popular</option>
        </select>
        <select
          name=""
          id=""
          className="py-2 px-4 rounded text-xs font-medium bg-gray-100"
        >
          <option>All Filters</option>

        </select>
      </div>
      <div className="">
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-100 ring-1 ring-gray-400 "
          onChange={handleFilterChange}
        >
          <option value="">Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="desc lastUpdated">Newest</option>
          <option value="asc lastUpdated">Oldest</option>
        </select>
      </div>
    </div >
  )
}

export default Filter