import { wixClientServer } from "@/lib/wixClientServer"
import Image from "next/image"
import Link from "next/link"


const CategoryList = async () => {

  const wixClient = await wixClientServer()

  const { items: catergories } = await wixClient.collections.queryCollections().find()

  return (
    // <div className="overflow-x-scroll scrollbar-hide">
    <div className="mt-12 overflow-x-scroll">
      <div className="flex gap-4 md:gap-8">
        {catergories.map(catergory => (
          <Link
            key={catergory._id}
            href={`/list?cat=${catergory.slug}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6">
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={catergory.media?.mainMedia?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="20vw"
                className="object-cover rounded-md"
              />
            </div>
            <h1 className="mt-8 mb-8 font-light text-clip tracking-wide">
              {catergory.name}
            </h1>
          </Link>
        ))
        }

      </div>
    </div>
  )
}

export default CategoryList