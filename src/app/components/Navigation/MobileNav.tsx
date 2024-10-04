"use client"
import Link from 'next/link'
import React from 'react'
import { FaNewspaper, FaRegistered, FaUser,FaBook } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { MdBedroomParent, MdHomeRepairService, MdWork } from 'react-icons/md'
import { IoHomeSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';


interface Props {
  showNav: boolean;
  setShowNav: (showNav:boolean) => void;
}

const MobileNav = ({ showNav, setShowNav }: Props) => {
  const pathname= usePathname()

    const handleCloseModal =(e:React.MouseEvent<HTMLDivElement>)=>{
        if ((e.target as HTMLDivElement).id === 'wrapper') {
           setShowNav(!showNav);
         }
    }
  
  
  
  
    const navStyle= showNav ? 'translate-x-0': 'translate-x-full';



  return (
    <div id='wrapper' onClick={handleCloseModal} className={` ${navStyle} lg:hidden fixed right-0 transition-all duration-500 left-0 top-0 bottom-0 h-[100vh] bg-[#000000e0] z-[1002]`}>
   
    <div className='relative bg-white transition-all duration-500 delay-200 flex flex-col items-center pt-[20%] w-[70%] h-[100%] overflow-auto'>
      <ImCross onClick={()=>setShowNav(!showNav)} className='absolute top-[2rem] right-[2rem] w-[1.5rem] h-[1.5rem] text-gray-600 cursor-pointer' />
      
      
      <h1 className='mb-10 text-[25px] sm:text-[30px] font-bold text-emerald-600'>Selcoool</h1>
      <ul className='space-y-10'>
      <li className={`text-[20px] font-medium hover:text-red-600 ${
        pathname === '/' ? 'text-red-600' : ''} `}>
          <Link href="/" className='flex items-center justify-center gap-1'>
            <IoHomeSharp className='text-purple-600' /> Home
          </Link>
        </li>
        <li className={`text-[20px] font-medium hover:text-red-600 ${
        pathname === '/skills' ? 'text-red-600' : ''} `}>
          <Link href="/skills" className='flex items-center justify-center gap-1'>
            <FaBook className='text-purple-600' /> Skills
          </Link>
        </li>
        <li className={`text-[20px] font-medium hover:text-red-600 ${
        pathname === '/works' ? 'text-red-600' : ''} `}>
          <Link href="/works" className='flex items-center justify-center gap-1'>
            <MdBedroomParent className='text-purple-600' /> Works
          </Link>
        </li>
       
      </ul>

      <div className='flex items-center pt-4 space-x-4'>
          <button  className='px-6 py-2 sm:px-8 sm:py-3 text-[14px] sm:text-[16px] bg-blue-950 transition-all duration-200 hover:bg-red-600 flex items-center rounded-md space-x-2  text-white'>
              <span>
                < FaUser  className='w-[1.3rem] h-[1.3rem] sm:w-[1.7rem] sm:h-[1.7rem]'/>
              </span>
              {/* <span>Sign Up</span> */}
          </button>


          <button  className='px-6 py-2 sm:px-8 sm:py-3 text-[14px] sm:text-[16px] bg-orange-500 transition-all duration-200 hover:bg-green-700 flex items-center rounded-md space-x-2  text-white'>
            <FaRegistered   className='w-[1.3rem] h-[1.3rem] sm:w-[1.7rem] sm:h-[1.7rem]'/>
          </button>

      

        </div>



    </div>
  </div>
  )
}

export default MobileNav