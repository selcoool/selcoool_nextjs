import React from 'react'
import { IoSearch,IoNotificationsOutline  } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import Image from 'next/image';


const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4'>
  
     <div className='hidden md:flex  items-center gap-2  rounded-full  px-[1rem] right-0 bg-white'>
        <IoSearch/>
        <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none" />
     </div>

     <div className='flex justify-end items-center w-full gap-[1rem]'>
        <div className='relative cursor-pointer'>
            <FiMessageSquare className='text-[1.5rem] lg:text-[1.8rem] hover:scale-110'/>
            <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-[1rem]'>2</div>

        </div>

        <div className='relative cursor-pointer'>
            <IoNotificationsOutline className='text-[1.5rem] lg:text-[1.8rem] hover:scale-110'/>
            <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-[1rem]'>1</div>
        </div>


        <div className='flex flex-col justify-center items-center cursor-pointer'>
          <span className='text-[0.9rem] font-bold'>Tran Minh Thanh</span>
          <span className='text-[0.7rem]'>(Nhan Vien)</span>
        </div>


        <div className='cursor-pointer'>

        <Image src="/avatar.jpg" alt="avatar.jpg" width="0" height="0" sizes="100vw" loading='eager' priority={true} className='rounded-full hover:scale-110 cursor-pointer w-9 h-9'/>
        </div>




     </div>
    
    </div>
  )
}

export default Navbar