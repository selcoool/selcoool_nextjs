import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaDatabase, FaRegistered, FaUser, FaProductHunt, FaComment,FaEye} from 'react-icons/fa';
import { MdOutlineEventNote } from "react-icons/md";
import { BiMessageAltError } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";

const MenuDashBoard = () => {
  // Data for the menu
  const data_api = [
    {
      subject: "Management",
      infor: [
        {
          infor_cd: "Users",
          infor_url: "/management/users/manage",
          infor_icons: <FaUser />
        },
        {
          infor_cd: "Events",
          infor_url: "/management/events/manage",
          infor_icons: <MdOutlineEventNote />
        },
        {
          infor_cd: "Products",
          infor_url: "/management/products/manage",
          infor_icons: <AiFillProduct />
        },
        {
          infor_cd: "Messages",
          infor_url: "/management/messages/manage",
          infor_icons: <FaComment />
        },
        {
          infor_cd: "Comments",
          infor_url: "/management/comments/manage",
          infor_icons: <BiMessageAltError />
        }
       
      ]
    },
    {
      subject: "Metrics",
      infor: [
        {
          infor_cd: "Users",
          infor_url: "/management/users",
          infor_icons: <FaUser />
        },
        {
          infor_cd: "Products",
          infor_url: "/admin/infor4",
          infor_icons: <AiFillProduct />
        },
        {
          infor_cd: "Comments",
          infor_url: "/admin/infor4",
          infor_icons: <BiMessageAltError />
        },
        {
          infor_cd: "Messages",
          infor_url: "/admin/infor4",
          infor_icons: <FaComment />
        },
        {
          infor_cd: "Events",
          infor_url: "/management/events",
          infor_icons: <MdOutlineEventNote />
        }
      ]
    }
    // Additional items can be added here
  ];

  return (
    <div className="flex h-screen">
      <div className="bg-[#eabe62] w-full h-full flex flex-col">
        <div className='flex-1 p-[0.5rem] overflow-hidden'>
          <div className='flex flex-col h-full'>
            {/* User avatar section */}
            <div className='flex items-center justify-center mb-4 max-h-[20vh]'>
              <div className="w-[1.6rem] h-[1.6rem] md:w-[3.75rem] md:h-[3.75rem] rounded-full relative overflow-hidden">
                <Image
                  src="/nextjs.PNG"
                  fill
                  alt="Avatar"
                  loading="eager"
                  sizes="cover"
                  priority={true}
                  style={{ objectFit: "cover" }} // Ensure the image fits the circular frame
                />
              </div>
            </div>

            {/* Scrollable menu section */}
            <div className='max-h-[80vh]'>
              <div className='flex-1 overflow-y-auto max-h-[95%] md:max-h-[95%] custom-scrollbar'>
                <div className='mb-7 flex flex-col justify-start'>
                  {data_api.map((item, index) => (
                    <div key={`${item.subject}-${index}`} className="mb-4">
                      <h2 className="font-bold mb-2 text-[0.5rem] md:text-[1rem] lg:text-[1.3rem]">{item.subject}</h2>
                      {item.infor.map((info, subIndex) => (
                        <Link key={`${info.infor_cd}-${subIndex}`} href={info.infor_url}>
                          <div className="flex items-center gap-x-6 mb-2 p-[0.5rem] rounded-[1rem] hover:bg-[#f7e4ba] cursor-pointer">
                            <div className='text-[1.2rem] lg:text-[1.8rem] cursor-pointer hover:scale-110 transition-transform duration-300'>
                              {info.infor_icons}
                            </div>
                            <div className="text-blue-500 hidden lg:block">
                              {info.infor_cd}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDashBoard;



