import React from 'react'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { PiBinoculars } from 'react-icons/pi'

const Footer = () => {
  return (
    <div className='pt-[5rem] pb-[3rem] bg-gray-900'>
       <div className='w-[80%] pb-[2rem] border-b-[2px] border-b-gray-300 border-opacity-50 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3rem] items-center'>
           {/* 1st part */}
        <div>
          {/* logo */}
          <div className='flex flex-col items-center space-x-2'>
                <PiBinoculars  className='w-[1.7rem] h-[1.7rem] sm:w-[3rem] sm:h-[3rem] font-bold text-orange-500 hover:text-emerald-600 hover:scale-110 cursor-pointer'/>
                <h1 className='text-[20px] sm:text-[22px] font-bold uppercase text-emerald-400'>Infor</h1>
          </div>
          <p className='text-white opacity-60 mt-[0.4rem]'>
          I'm looking for an opportunity working in IT section. I appreciate it if you can recommend me a good one. Thank you very much !
          </p>
           <p className='mt-[1rem] text-white'>
           trmthanh220895@gmail.com
           </p>
           <p className='text-red-300 text-[19px] font-bold'>
            +(60)142718277
           </p>
        </div>

       {/* 2nd part */}
       <div>
         <h1 className='text-[22px] font-semibold mb-[2rem] uppercase text-red-500'>Skills</h1>
         <p className='mt-[0.7rem] text-white  hover:text-yellow-300 transition-all duration-200 cursor-pointer w-fit'>CSS</p>
         <p className='mt-[0.7rem] text-white  hover:text-yellow-300 transition-all duration-200 cursor-pointer w-fit'>Javascript</p>
         <p className='mt-[0.7rem] text-white  hover:text-yellow-300 transition-all duration-200 cursor-pointer w-fit'>Reactjs</p>
         <p className='mt-[0.7rem] text-white  hover:text-yellow-300 transition-all duration-200 cursor-pointer w-fit'>Nexjs</p>
         <p className='mt-[0.7rem] text-white  hover:text-yellow-300 transition-all duration-200 cursor-pointer w-fit'>Nestjs</p>


       </div>


          {/* 3rd part */}
          <div>
         <h1 className='text-[22px] font-semibold mb-[2rem] uppercase text-pink-500'>Looking for</h1>
         <p className='mt-[0.7rem] text-white  hover:text-yellow-300 transition-all duration-200 cursor-pointer w-fit'>Free-lancer</p>
         <p className='mt-[0.7rem] text-white  hover:text-yellow-300 transition-all duration-200 cursor-pointer w-fit'>Others</p>


       </div>
            {/* 4th part */}
          <div>
         <h1 className='text-[22px] font-semibold mb-[2rem] uppercase text-blue-500'>Opening Hours</h1>
        <p className='text-white text-[18px]'>Monday-Sunday: <span className='text-yellow-300'>24/7 but you need to confirm in advance</span></p>
        {/* <p className='text-white text-[18px]'>Saturday:<span className='text-yellow-300'>08:00am -12:00pm</span></p> */}

        {/* social network */}
        <div className='flex mt-[2rem] items-center space-x-6'>
           <FaFacebook className='w-[1.5rem] h-[1.5rem] text-blue-400 cursor-pointer'/>
           <FaInstagram className='w-[1.5rem] h-[1.5rem] text-red-400 cursor-pointer'/>
           <FaWhatsapp className='w-[1.5rem] h-[1.5rem] text-green-400 cursor-pointer'/>

        </div>

       </div>


       </div>
       <p className='text-center text-white  mt-[1.5rem]'>Copyright @ 2024 <span className='font-bold text-blue-600'>Selcoool.com</span>. All rights reserved</p>
    </div>
  )
}

export default Footer