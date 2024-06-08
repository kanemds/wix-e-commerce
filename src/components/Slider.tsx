"use client"
import two from "../../public/two.jpg"
import one from "../../public/one.jpg"
import three from "../../public/three.jpg"

// import { slides } from "@/defaultDate/sliders"
import Image from "next/image"
import Link from "next/link"
import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'


export const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: two,
    url: "/",
    bg: "bg-gradient-to-r from-orange-100 to-blue-200",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: three,
    url: "/",
    bg: "bg-gradient-to-r from-blue-100 to-red-200",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: one,
    url: "/",
    bg: "bg-gradient-to-r from-red-200 to-yellow-200",
  },
]


const Slider = () => {

  const [current, setCurrent] = useState(0)


  // const progressCircle: ProgressCircleRef = useRef<HTMLElement>(null)
  const progressCircle: React.RefObject<SVGSVGElement> = useRef<SVGSVGElement>(null)
  const progressContent = useRef<HTMLElement | null>(null)

  const onAutoplayTimeLeft = (s: any, time: number, progress: number): void => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', String(1 - progress))
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
    }
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1))
  //   }, 3000)

  //   return () => clearInterval(interval)
  // }, [])

  return (
    // <div className="h-general  overflow-hidden">
    //   <div
    //     className="w-max h-full flex transition-all ease-in-out duration-1000"
    //     style={{ transform: `translateX(-${current * 100}vw)` }}
    //   >
    //     {slides.map(slide => (
    //       <div

    //         className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
    //         key={slide.id}
    //       >
    //         {/* text container */}
    //         <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
    //           {slide.bg}
    //           <h2 className="text-xl lg:text-3xl 2xl:text-5xl">{slide.description}</h2>
    //           <h1 className="text-5xl lg:text-6xl 2xl:text-8xl">{slide.title}</h1>
    //           <Link href={slide.url}>
    //             <button className="rounded-md bg-black text-white py-3 px-4">SHOP NOW</button>
    //           </Link>
    //         </div>
    //         {/* image container */}
    //         <div className="relative h-1/2 xl:w-1/2 xl:h-full">
    //           <Image
    //             src={slide.img}
    //             alt=""
    //             fill
    //             sizes="100%"
    //             className="object-cover"
    //           />
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    //   <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
    //     {slides.map((slide, index) => (

    //       <div
    //         key={slide.id}
    //         className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${current === index ? "scale-150" : ""}`}
    //         onClick={() => setCurrent(index)}
    //       >
    //         {current === index && (
    //           <div className="w-[6px] h-[6px] bg-gray-600 rounded-full">
    //           </div>
    //         )}
    //       </div>
    //     ))}
    //   </div>

    // </div >
    <>
      <div className="h-general  overflow-hidden flex">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: true,
          // }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          {slides && slides?.map(slide => (
            <SwiperSlide>
              <div
                key={slide.id}
                className={`${slide?.bg} w-screen h-full flex flex-col gap-16 md:flex-row`}
              >
                {/* text container */}
                <div className="h-1/2 md:w-1/2 md:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
                  <h2 className="text-xl lg:text-3xl 2xl:text-5xl">{slide.description}</h2>
                  <h1 className="text-5xl lg:text-6xl 2xl:text-8xl">{slide.title}</h1>
                  <Link href={slide.url}>
                    <button className="rounded-md bg-black text-white py-3 px-4">SHOP NOW</button>
                  </Link>
                </div>
                {/* image container */}
                <div className="relative h-1/2 md:w-1/2 md:h-full">
                  <Image
                    src={slide.img}
                    alt=""
                    fill
                    sizes="100%"
                    className="object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </>
  )
}

export default Slider