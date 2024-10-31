"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegistered, FaUser, FaBook } from 'react-icons/fa';
import { HiBars3BottomRight } from 'react-icons/hi2';
import { MdWork } from 'react-icons/md';
import { IoHomeSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toggleModalRegisterHomePage, toggleModalContactHomePage } from '../../store/toogleModalSlice';
import { AppDispatch } from '../../store/store';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Props {
    showNav: boolean;
    setShowNav: (showNav: boolean) => void;
}

const Nav = ({ showNav, setShowNav }: Props) => {
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const [ref, inView] = useInView({
        threshold: 0.1, // Trigger when 10% of the element is visible
        triggerOnce: false, // Set to true to trigger the animation only once
    });

    // Animation variants
    const logoVariants = {
        hidden: { opacity: 0, x: '-50vw' },
        visible: { opacity: 1, x: 0 },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    const buttonVariants = {
        left: {
            hidden: { opacity: 0, x: '-1vw' },
            visible: { opacity: 1, x: 0 },
        },
        right: {
            hidden: { opacity: 0, x: '1vw' },
            visible: { opacity: 1, x: 0 },
        },
    };

    return (
        <div ref={ref} className='h-[12vh] min-h-20 bg-white'>
            <div className='sm:w-[90%] mx-8 lg:mx-auto flex h-full items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <motion.div
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={logoVariants}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                        <Image 
                            src="/avatar.jpg" 
                            alt="avatar.jpg" 
                            width={36} 
                            height={36} 
                            className='rounded-full hover:scale-110 cursor-pointer' 
                        />
                    </motion.div>
                    <motion.h1
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={logoVariants}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className='text-[20px] sm:text-[30px] font-bold text-green-500'>
                        <Link href="/">Selcoool</Link>
                    </motion.h1>
                </div>

                <ul className='hidden lg:flex items-center space-x-10'>
                    {['/', '/skills', '/works'].map((link, index) => {
                        const titles = ['Home', 'Skills', 'Works'];
                        const icons = [
                            <IoHomeSharp className='text-purple-600' />, 
                            <FaBook className='text-purple-600' />, 
                            <MdWork className='text-purple-600' />
                        ];

                        return (
                            <motion.li
                                key={link}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                variants={itemVariants}
                                transition={{ duration: 0.3, delay: index * 0.1, ease: 'easeInOut' }}
                                className={`text-[20px] font-medium hover:text-red-600 ${pathname === link ? 'text-red-600' : ''}`}>
                                <Link href={link} className='flex items-center justify-center gap-1'>
                                    {icons[index]} {titles[index]}
                                </Link>
                            </motion.li>
                        );
                    })}
                </ul>

                <div className='flex items-center space-x-4'>
                    <motion.button
                        onClick={() => dispatch(toggleModalContactHomePage())}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={buttonVariants.left}
                        transition={{ duration: 0.5, delay: 0.6, ease: 'easeInOut' }}
                        className='hidden px-6 py-2 sm:px-8 sm:py-3 text-[0.7rem] sm:text-[1rem] bg-blue-950 transition-all duration-200 hover:bg-red-600 md:flex items-center rounded-md space-x-2 text-white'>
                        <FaUser className='w-[1rem] h-[1rem] sm:w-[1.4rem] sm:h-[1.4rem]' />
                    </motion.button>

                    <motion.button
                        onClick={() => dispatch(toggleModalRegisterHomePage())}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={buttonVariants.right}
                        transition={{ duration: 0.4, delay: 1.2, ease: 'easeInOut' }}
                        className='hidden px-6 py-2 sm:px-8 sm:py-3 text-[0.7] sm:text-[1rem] bg-orange-500 transition-all duration-200 hover:bg-green-700 md:flex items-center rounded-md space-x-2 text-white'>
                        <FaRegistered className='w-[1rem] h-[1rem] sm:w-[1.4rem] sm:h-[1.4rem]' />
                    </motion.button>

                    <motion.div
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={buttonVariants.left}
                        transition={{ duration: 0.4, delay: 1.2, ease: 'easeInOut' }}
                        className='lg:hidden'>
                        <HiBars3BottomRight 
                            onClick={() => setShowNav(!showNav)} 
                            className='w-[3rem] h-[3rem] text-black font-bold cursor-pointer' 
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Nav;















// "use client"
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'
// import { FaRegistered, FaUser,FaBook } from 'react-icons/fa'
// import { HiBars3BottomRight } from 'react-icons/hi2'
// import { MdWork } from 'react-icons/md'
// import { IoHomeSharp } from "react-icons/io5";
// import { usePathname } from 'next/navigation';


// import { useDispatch } from 'react-redux';
// import { toggleModalRegisterHomePage,toggleModalContactHomePage } from '../../store/toogleModalSlice';
// import { AppDispatch } from '../../store/store';


// interface Props {
//     showNav:boolean;
//     setShowNav:(showNav:boolean)=>void;
//   }





// const Nav = ({showNav,setShowNav}:Props) => {

//   const pathname= usePathname()
//   const dispatch = useDispatch<AppDispatch>();
//   return (
//     <div className='h-[12vh] min-h-20 bg-white'>
//     <div className='sm:w-[90%] mx-8 lg:mx-auto  flex h-[100%] items-center justify-between'>
//       {/* logo div */}
//       <div className='flex items-center space-x-2'>
//              <Image src="/avatar.jpg" alt="avatar.jpg" width="0" height="0" sizes="100vw" loading='eager' priority={true} className='rounded-full hover:scale-110 cursor-pointer w-9 h-9'/>
//              {/* <PiBinoculars data-aos="fade-right" data-aos-anchor-placement="top-center"  className='w-[1.7rem] h-[1.7rem] sm:w-[2rem] sm:h-[2rem] font-bold text-orange-500 hover:text-emerald-600 hover:scale-110 cursor-pointer'/> */}
//              <h1 data-aos="fade-top" data-aos-delay="400" data-aos-anchor-placement="top-center" className='text-[20px] sm:text-[30px] font-bold text-green-500'>  <Link href="/" >Selcoool</Link></h1>
//       </div>
//          {/* Nav Link */}

     
//         <ul className='hidden lg:flex items-center  space-x-10'>
//         {/* data-aos="fade-left" data-aos-delay="10"  data-aos-anchor-placement="top-center" */}
//           <li  className={`text-[20px] font-medium hover:text-red-600 ${
//         pathname === '/' || pathname === '/home' ? 'text-red-600' : ''} `}>
//                <Link href="/" className='flex items-center justify-center gap-1'><IoHomeSharp className='text-purple-600' />Home</Link>
//             </li>
//             {/* data-aos="fade-left" data-aos-delay="200"  data-aos-anchor-placement="top-center" */}
//             <li  className={`text-[20px] font-medium hover:text-red-600 ${
//         pathname === '/skills' ? 'text-red-600' : ''} `}>
//                <Link href="/skills" className='flex items-center justify-center gap-1'><FaBook className='text-purple-600' />Skills</Link>
//             </li>
//             {/* data-aos="fade-left" data-aos-delay="400" data-aos-anchor-placement="top-center" */}
//             <li  className={`text-[20px] font-medium hover:text-red-600 ${
//         pathname === '/works' ? 'text-red-600' : ''} `}>
//                <Link href="/works" className='flex items-center justify-center gap-1'><MdWork className='text-purple-600'  />Works</Link>
//             </li>
       

//         </ul>

//         {/* buttons */}
//         <div className='flex items-center space-x-4'>
//           <button  onClick={() => dispatch(toggleModalContactHomePage())}  data-aos="fade-right" data-aos-delay="600"  data-aos-anchor-placement="top-center" className='hidden px-6 py-2 sm:px-8 sm:py-3 text-[0.7rem] sm:text-[1rem] bg-blue-950 transition-all duration-200 hover:bg-red-600 md:flex items-center rounded-md space-x-2  text-white'>
//               <span>
//                 < FaUser   className='w-[1rem] h-[1rem] sm:w-[1.4rem] sm:h-[1.4rem]'/>
//               </span>
//               {/* <span>Sign Up</span> */}
//           </button>


//           <button onClick={() => dispatch(toggleModalRegisterHomePage())} data-aos="fade-left" data-aos-delay="800"  data-aos-anchor-placement="top-center" className='hidden px-6 py-2 sm:px-8 sm:py-3 text-[0.7] sm:text-[1rem] bg-orange-500 transition-all duration-200 hover:bg-green-700 md:flex items-center rounded-md space-x-2  text-white'>
//             <FaRegistered   className='w-[1rem] h-[1rem] sm:w-[1.4rem] sm:h-[1.4rem]'/>
//           </button>


//           {/* <button onClick={() => dispatch(toggleModal())} data-aos="fade-left" data-aos-delay="800"  data-aos-anchor-placement="top-center" className='hidden px-6 py-2 sm:px-8 sm:py-3 text-[0.7] sm:text-[1rem] bg-orange-500 transition-all duration-200 hover:bg-green-700 md:flex items-center rounded-md space-x-2  text-white'>
//             <FaRegistered   className='w-[1rem] h-[1rem] sm:w-[1.4rem] sm:h-[1.4rem]'/>
//           </button>  */}

     
//             {/* Icon */}
//           <HiBars3BottomRight  data-aos="fade-left" data-aos-delay="1000"  data-aos-anchor-placement="top-center" onClick={()=>setShowNav(!showNav)} className='lg:hidden w-[3rem] h-[3rem] text-black font-bold cursor-pointer'/>

//         </div>

//     </div>
//   </div>
//   )
// }

// export default Nav