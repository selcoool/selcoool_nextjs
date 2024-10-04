import Image from 'next/image'
import React from 'react'

import { FaNewspaper, FaPhoneAlt, FaRegistered, FaUser,FaBook } from 'react-icons/fa'

const MenuDashBoard = () => {

 const data_api=[
    {
        cd:"WEB",
        infor:[
            {
                infor_cd:"Content WEB 1",
                infor_url:"/admin/infor1",
                infor_icons:<FaNewspaper/>
            },
            {
                infor_cd:"Content WEB 2",
                infor_url:"/admin/infor2",
                infor_icons:<FaPhoneAlt/>
            }
        ]
    },
    {
        cd:"APP",
        infor:[
            {
                infor_cd:"Content APP 1",
                infor_url:"/admin/infor3",
                infor_icons:<FaRegistered/>
            },
            {
                infor_cd:"Content APP 2",
                infor_url:"/admin/infor4",
                infor_icons:<FaUser/>
            }
        ]
    }
 ]




  return (
    <div className='w-full h-full'>

       <div className='w-full h-full'>
        <div className='flex justify-start items-center space-x-[1rem]'>
        <div className="w-[6rem] h-[6rem] rounded-full relative overflow-hidden">
            <Image
            src="/nextjs.PNG"
            fill
          alt="Avatar"
          loading='eager'
          // className="object-cover"
           sizes='cover'
           priority={true}
                         
                        />
        </div>
        <div>
            <div className='text-[1rem] text-[#0B0B0C]'><span>Name:</span><span >Tran Minh Thanh</span></div>
            <div className='text-[0.8rem] text-[#111010]'><span>Position:</span><span >Nhân Viên</span></div>
        </div>
        </div>
     
         <div className='w-full h-full'>
         {data_api.map((item, index) => (
                <div key={index} className="mb-4">
                    <h2 className="font-bold">{item.cd}</h2>
                    <div className="ml-4">
                        {item.infor.map((info, subIndex) => (
                            <div key={subIndex} className="flex items-center gap-2">
                                {info.infor_icons}
                                <a href={info.infor_url} className="text-blue-500 hover:underline">
                                    {info.infor_cd}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
             
         </div>
        </div>
    </div>
  )
}

export default MenuDashBoard


