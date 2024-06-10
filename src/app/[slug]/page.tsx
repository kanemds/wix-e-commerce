import Add from "@/components/Add"
import CustomeizeProducts from "@/components/CustomeizeProducts"
import ProductImages from "@/components/ProductImages"
import Image from "next/image"


const SinglePage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* image  */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages />
      </div>

      {/* text */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 ">
        <h1 className="text-4xl font-medium">Product Name</h1>
        {/* <p className="hyphens-auto text-gray-500"> */}
        <p className="word-breaks text-gray-500">
          The longest word in any of the major English language dictionaries is pneumo noultra microscop icsilicovol canoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.
        </p>
        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">$59</h3>
          <h2 className="text-2xl font-medium">$49</h2>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <CustomeizeProducts />
        <Add />
        <div className="h-[2px] bg-gray-100" />
        <div className="text-sm">
          <h4 className="font-medium mb-4">
            Title
          </h4>
          <p word-breaks>
            The longest word in any of the major English language dictionaries is pneumo noultra microscop icsilicovol canoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">
            Title
          </h4>
          <p word-breaks>
            The longest word in any of the major English language dictionaries is pneumo noultra microscop icsilicovol canoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">
            Title
          </h4>
          <p word-breaks>
            The longest word in any of the major English language dictionaries is pneumo noultra microscop icsilicovol canoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SinglePage