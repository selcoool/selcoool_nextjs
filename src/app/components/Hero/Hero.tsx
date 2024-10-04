"use client"
import Image from 'next/image';
import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const Hero = () => {
    return (
        <Carousel
        centerMode={false}
            arrows={true}
            swipeable={true}
            // draggable={false}
            showDots={true}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            // customTransition="all .5"
            transitionDuration={500}
        >
           <div className='w-[100%] h-[70vh] flex items-center justify-center flex-col bg-green-700 md:clip-path'>
               <div className='w-[80%] flex flex-col lg:flex-row   justify-center items-center mx-auto'>
                <div className=' md:w-1/3 flex flex-wrap justify-center items-center'>
                <Image src={'/avatar.jpg'}   alt="Node.js"
      width={200} 
      height={200} loading='eager' />
                </div>

                <div className=' md:w-2/3 lg:mt-[-3rem] '>
                       <h1 className='flex justify-center items-center text-[2rem]  md:text-[3rem] text-red-500  space-x-[1rem]'><span className='hover:scale-110 hover:text-zinc-50'>Welcome</span> <span className='hover:scale-110 hover:text-zinc-50'>to</span><span className='hover:scale-110 hover:text-zinc-50'>Selcoool's Profile</span></h1>
                       <p  className='text-white text-[1.2rem]'><span>Full Name:</span><span className='text-orange-400'>Tran Minh Thanh</span></p>
                       <p className='text-white text-[1.2rem]'><span>Age:</span><span className='text-orange-400'>29+</span></p>
                       <p  className='text-white text-[1.2rem]'><span>Major:</span> <span className='text-orange-400'>English</span></p>
                       <p  className='text-white text-[1.2rem]'><span>Hobby:</span> <span className='text-orange-400'>Music + Programming</span></p>
                       <p  className='text-white text-[1.2rem]'><span>Marital Status:</span> <span className='text-orange-400'>Single</span></p>

                 </div>
                   
                
                  
               </div>
          
           </div>




           <div className='w-[100%] h-[70vh] flex items-center justify-center flex-col bg-green-700 md:clip-path'>
               <div className='w-[80%] flex flex-col justify-center items-center mx-auto'>

               <div className='text-orange-600 font-bold text-[2rem]  md:text-[3rem] justify-center items-center pb-[2rem]'>
                EXPERIENCE
                </div>
                <div className='grid grid-cols-5 gap-[1rem]' >
                <Image  src={'/tailwindcss.PNG'} width="0" height="0" sizes="100vw" className="w-[5rem] h-[5rem] md:w-[6rem] md:h-[6rem] lg:w-[10rem] lg:h-[10rem] hover:scale-110 cursor-pointer" alt='sddfsdfsd' loading='eager' priority={true}/>
               <Image src={'/nextjs.PNG'}  width="0" height="0" sizes="100vw" className="w-[5rem] h-[5rem] md:w-[6rem] md:h-[6rem] lg:w-[10rem] lg:h-[10rem] hover:scale-110 cursor-pointer" alt='sddfsdfsd' loading='eager' priority={true}  />
                <Image src={'/nodejs.PNG'}  width="0" height="0" sizes="100vw" className="w-[5rem] h-[5rem] md:w-[6rem] md:h-[6rem] lg:w-[10rem] lg:h-[10rem] hover:scale-110 cursor-pointer" alt='sddfsdfsd' loading='eager' priority={true} />
                <Image src={'/reactjs.PNG'} width="0" height="0" sizes="100vw" className="w-[5rem] h-[5rem] md:w-[6rem] md:h-[6rem] lg:w-[10rem] lg:h-[10rem] hover:scale-110 cursor-pointer" alt='sddfsdfsd' loading='eager' priority={true}  />
                <Image src={'/nestjs.PNG'} width="0" height="0" sizes="100vw" className="w-[5rem] h-[5rem] md:w-[6rem] md:h-[6rem] lg:w-[10rem] lg:h-[10rem] hover:scale-110 cursor-pointer" alt='sddfsdfsd' loading='eager' priority={true} /> 
                  
                </div>
                
                  
               </div>
          
           </div>


           
           <div className='w-[100%] h-[70vh] flex items-center justify-center flex-col bg-green-700 md:clip-path'>
               <div className='w-[80%] flex flex-col justify-center items-center mx-auto'>

            
                <div className='text-blue-950 font-bold text-[2rem]  md:text-[3rem] justify-center items-center pb-[2rem]'>
                INTERESTED IN
                </div>
                <div className='flex flex-col justify-center items-center gap-[1rem]' >
                <p className='text-orange-400 text-[1.5rem] hover:text-gray-50 cursor-pointer'>Free-lancer</p>
                <p className='text-orange-400 text-[1.5rem] hover:text-gray-50 cursor-pointer'>Private Project</p>
                  
                </div>
                
                  
               </div>
          
           </div>




        </Carousel>
  )
}

export default Hero