import Image from 'next/image';
import React from 'react';


const MenuProduct = () => {
  return (
    <div className="w-[80%] mx-auto mb-[2rem]">
    <h1 className='text-purple-600 font-extrabold text-[1.8rem] md:text-[2.5rem]'>Outstanding Features:</h1>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[1rem]">
      <div className="relative bg-slate-600 w-full h-[11rem] md:h-[14rem] cursor-pointer group">
        <Image
          src="/avatar.jpg"
         
          fill
          alt="Avatar"
          loading='eager'
          // className="object-cover"
           sizes='cover'
           priority={true}
        />
        <div className='absolute top-0 bottom-0 w-full h-full bg-gray-950/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <div className='flex flex-col justify-center items-center w-full h-full'>
            <h1 className='text-[1rem] md:text-[1.5rem] text-neutral-50 pb-[1rem] font-extrabold'>
              Project 1
            </h1>
            <div className='flex space-x-2'>
              <div className='bg-green-400 hover:bg-amber-300 rounded-md w-fit px-[0.5rem] text-[1rem] md:text-[1.5rem]'>
                Watch
              </div>
              <div className='bg-red-400  hover:bg-amber-300 rounded-md w-fit px-[0.5rem] text-[1rem] md:text-[1.5rem]'>
                Buy
              </div>
            </div>
            <h3 className='text-[1rem] md:text-[1.5rem] text-red-500 pb-[1rem] font-extrabold pt-[2rem]'>100$</h3>
          </div>
        </div>
      </div>


      <div className="relative bg-slate-600 w-full h-[11rem] md:h-[14rem] cursor-pointer group">
        <Image
          src="/avatar.jpg"
          fill
          alt="Avatar"
          loading='eager'

           sizes='cover'
           priority={true}
        />
        <div className='absolute top-0 bottom-0 w-full h-full bg-gray-950/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <div className='flex flex-col justify-center items-center w-full h-full'>
            <h1 className='text-[1rem] md:text-[1.5rem] text-neutral-50 pb-[1rem] font-extrabold'>
              Project 1
            </h1>
            <div className='flex space-x-2'>
              <div className='bg-green-400 hover:bg-amber-300 rounded-md w-fit px-[0.5rem] text-[1rem] md:text-[1.5rem]'>
                Watch
              </div>
              <div className='bg-red-400  hover:bg-amber-300 rounded-md w-fit px-[0.5rem] text-[1rem] md:text-[1.5rem]'>
                Buy
              </div>
            </div>
            <h3 className='text-[1rem] md:text-[1.5rem] text-red-500 pb-[1rem] font-extrabold pt-[2rem]'>100$</h3>
          </div>
        </div>
      </div>
      


      <div className="relative bg-slate-600 w-full h-[11rem] md:h-[14rem] cursor-pointer group">
        <Image
          src="/avatar.jpg"
          // layout="fill"
          // objectFit="cover"
          // alt="avatar"
          fill
          alt="Avatar"
          loading='eager'
           sizes='cover'
           priority={true}
        />
        <div className='absolute top-0 bottom-0 w-full h-full bg-gray-950/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <div className='flex flex-col justify-center items-center w-full h-full'>
            <h1 className='text-[1rem] md:text-[1.5rem] text-neutral-50 pb-[1rem] font-extrabold'>
              Project 1
            </h1>
            <div className='flex space-x-2'>
              <div className='bg-green-400 hover:bg-amber-300  duration-300 rounded-md w-fit px-[0.5rem] text-[1rem] md:text-[1.5rem]'>
                Watch
              </div>
              <div className='bg-red-400  hover:bg-amber-300 duration-300 rounded-md w-fit px-[0.5rem] text-[1rem] md:text-[1.5rem]'>
                Buy
              </div>
            </div>
            <h3 className='text-[1rem] md:text-[1.5rem] text-red-500 pb-[1rem] font-extrabold pt-[2rem]'>100$</h3>
          </div>
        </div>
      </div>
      
      

 


      



    </div>
  </div>
  );
};

export default MenuProduct;
