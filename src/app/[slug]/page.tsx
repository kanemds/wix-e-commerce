import Add from "@/components/Add"
import CustomeizeProducts from "@/components/CustomeizeProducts"
import ProductImages from "@/components/ProductImages"
import { wixClientServer } from "@/lib/wixClientServer"
import DOMPurify from "isomorphic-dompurify"
import Image from "next/image"
import { notFound } from "next/navigation"

const SinglePage = async ({ params }: { params: { slug: string } }) => {

  // console.log(params) // [slug]/page
  const wixClient = await wixClientServer()

  const { items: products } = await wixClient.products.queryProducts().eq("slug", params.slug).find()

  if (!products[0]) {
    return notFound()
  }

  const product = products[0]



  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* image  */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages itemImages={product.media?.items} />
      </div>

      {/* text */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 ">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        {/* <p className="hyphens-auto text-gray-500"> */}
        <p className="word-breaks text-gray-500">
          {product.description}
        </p>
        <div className="h-[2px] bg-gray-100" />

        {product.price?.discountedPrice === product.price?.price ?
          <h2 className="text-2xl font-medium">${product.price?.price}</h2> :
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">${product.price?.price}</h3>
            <h2 className="text-2xl font-medium">${product.price?.discountedPrice}</h2>
          </div>
        }

        <div className="h-[2px] bg-gray-100" />

        {product.variants && product._id && product.productOptions &&
          <CustomeizeProducts productId={product._id} variants={product.variants} productOption={product.productOptions} />
        }


        <Add />
        <div className="h-[2px] bg-gray-100" />
        {product?.additionalInfoSections?.map((section: any) => (
          <div key={section.title} className="text-sm">
            <h4 className="font-medium mb-4">
              {section.title}
            </h4>
            <div className="word-breaks" dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                section.description
              )
            }} />

          </div>
        ))}
      </div>
    </div >
  )
}

export default SinglePage
