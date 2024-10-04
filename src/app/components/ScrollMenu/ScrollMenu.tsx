"use client"
import Image from 'next/image';
import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const ScrollMenu = () => {
    return (

        <div className='w-[80%] mx-auto mb-[2rem]'>
            <h1 className='text-blue-500 font-extrabold text-[1.8rem] md:text-[2.5rem]'>My Projects:</h1>
            <Carousel

                centerMode={false}
                arrows={true}
                swipeable={true}
                // draggable={false}
                // showDots={true}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                // customTransition="all .5"
                transitionDuration={500}

            >



          



                <div className='bg-orange-600 flex flex-col h-[30vh] justify-center items-center '>
                    {/* <Image src={'/avatar.jpg'} width={100} height={100} alt='avatar'/> */}
                    <div className="w-full h-full relative  flex flex-col justify-center items-center">
                        <Image
                            src="/reactjs.PNG"
                            fill
          alt="Avatar"
          loading='eager'
          // className="object-cover"
           sizes='cover'
           priority={true}
                          
                        />

                        <div className='absolute flex flex-col justify-center items-center'>

                            <div className='bg-orange-400 w-fit h-fit p-[0.5rem] rounded-lg  text-white hover:text-black hover:bg-green-400 cursor-pointer'>See more</div>

                        </div>
                    </div>


                </div>



                <div className='bg-orange-600 flex flex-col h-[30vh] justify-center items-center '>
                    {/* <Image src={'/avatar.jpg'} width={100} height={100} alt='avatar'/> */}
                    <div className="w-full h-full relative  flex flex-col justify-center items-center">
                        <Image
                            src="/nextjs.PNG"
                            fill
          alt="Avatar"
          loading='eager'
          // className="object-cover"
           sizes='cover'
           priority={true}
                         
                        />

                        <div className='absolute flex flex-col justify-center items-center'>

                            <div className='bg-orange-400 w-fit h-fit p-[0.5rem] rounded-lg hover:bg-green-400 text-white hover:text-black cursor-pointer'>See more</div>

                        </div>
                    </div>


                </div>



                <div className='bg-orange-600 flex flex-col h-[30vh] justify-center items-center '>
                    {/* <Image src={'/avatar.jpg'} width={100} height={100} alt='avatar'/> */}
                    <div className="w-full h-full relative  flex flex-col justify-center items-center">
                        <Image
                            src="/nestjs.PNG"
                            fill
                            alt="Avatar"
                            loading='eager'
                            // className="object-cover"
                             sizes='cover'
                             priority={true}
                        />

                        <div className='absolute flex flex-col justify-center items-center'>

                            <div className='bg-orange-400 w-fit h-fit p-[0.5rem] rounded-lg text-white hover:bg-green-400 hover:text-black cursor-pointer'>See more</div>

                        </div>
                    </div>


                </div>


                <div className='bg-orange-600 flex flex-col h-[30vh] justify-center items-center '>
                    {/* <Image src={'/avatar.jpg'} width={100} height={100} alt='avatar'/> */}
                    <div className="w-full h-full relative  flex flex-col justify-center items-center">
                        <Image
                            src="/nextjs.PNG"
                            fill
                            alt="Avatar"
                            loading='eager'
                            // className="object-cover"
                             sizes='cover'
                             priority={true}
                        />

                        <div className='absolute flex flex-col justify-center items-center'>

                            <div className='bg-orange-400 w-fit h-fit p-[0.5rem] rounded-lg text-white hover:bg-green-400 hover:text-black cursor-pointer'>See more</div>

                        </div>
                    </div>


                </div>


            </Carousel>
        </div>
    )
}

export default ScrollMenu
