

import { wixClientServer } from "@/lib/wixClientServer"
import { products } from "@wix/stores"
import DOMPurify from "isomorphic-dompurify"

import Image from "next/image"
import Link from "next/link"



const productPerPage = 20

const ProductList = async ({
  categoryId, limit, searchParams
}: {
  searchParams?: any
  categoryId: string
  limit?: number
}) => {

  const wixClient = await wixClientServer()

  const productQuery = wixClient.products.queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome("productType", searchParams?.type ? [searchParams.type] : ["physical", "digital"])
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 9999)
    .limit(limit || productPerPage)
  // .find()

  let responseObj
  //  searchParams?.sort value is from filter name <select name="sort"></select>
  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ")

    if (sortType === "asc") {
      responseObj = await productQuery.ascending(sortBy).find()
      return responseObj
    }
    if (sortType === "desc") {

      responseObj = await productQuery.descending(sortBy).find()

    }
  } else {
    return responseObj = await productQuery.find()
  }



  // const responseObj = await productQuery.find()


  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {/* {responseObj.items.map((product:products.Product) => ( */}
      {responseObj && responseObj?.items.map((product: products.Product) => (

        <Link key={product?._id} href={"/" + product.slug} className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
          <div className="relative w-full h-80">
            <Image
              src={product?.media?.mainMedia?.image?.url || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              // className="absolute object-cover rounded-md z-10 hover: opacity-0 transition-opacity easy duration-500"
              className={`absolute object-cover rounded-md z-10 ${product?.media?.items && product.media.items[1] ? "hover:opacity-0 transition-opacity ease duration-500" : ""}`}
            />
            {product?.media?.items && <Image
              src={product?.media?.items[1]?.image?.url || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md "
            />}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product?.name}</span>
            <span className="font-semibold">${product?.price?.price}</span>
          </div>

          {/* {removeHTMLtag(product.description)} */}
          {product.additionalInfoSections &&
            <div className="text-sm text-gray-500" dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                product.additionalInfoSections.find((section: any) => section.title === "shortDesc")?.description || ""
              )
            }}>

            </div>
          }

          <button className="rounded-2xl ring-1 w-max ring-cartRed text-cartRed py-2 px-4 text-xs hover:bg-cartRed hover:text-white">Add to Cart</button>
        </Link>
      ))}
    </div>
  )
}

export default ProductList