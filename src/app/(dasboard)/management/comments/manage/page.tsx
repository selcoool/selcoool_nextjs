"use client"
import FormModal from '@/app/components_dashboard/FormModal';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

const ManageCommentPage = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="bg-[#a49845] w-full h-full min-h-[78vh] p-4">
        {/* Title and controls */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold hidden md:block">Manage Comments</h2>
          {/* Search and action icons */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-2 rounded-full px-4 bg-white"> {/* Adjusted padding */}
              <IoSearch />
              <input 
                type="text" 
                placeholder="Search..." 
                aria-label="Search comments"
                className="w-[8.5rem] md:w-[12rem] p-2 bg-transparent outline-none" 
              />
            </div>
            <div className="flex justify-center space-x-2"> {/* Adjusted spacing */}
              <IoIosAddCircle className="cursor-pointer text-[#4f1a3a] text-[1.8rem]" />
              <FaEdit className="cursor-pointer text-[#4f1a3a] text-[1.8rem]" />
              <MdDelete className="cursor-pointer text-[#4f1a3a] text-[1.8rem]" />
            </div>
          </div>
        </div>

        {/* Table Wrapper with Scroll */}
        <div className="overflow-y-auto max-h-[65vh] custom-scrollbar">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 border border-gray-300">ID</th>
                <th className="px-4 py-2 border border-gray-300">Comment</th>
     
                <th className="px-4 py-2 border border-gray-300 hidden md:table-cell">Status</th>
                <th className="px-4 py-2 border border-gray-300">Adjust</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 20 }).map((_, index) => (
                <tr key={index} className="hover:bg-slate-400">
                  <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-300">Good !</td>
                  <td className="px-4 py-2 border border-gray-300 hidden md:table-cell">Inactive</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {/* <div className="flex justify-center space-x-2">
                      <IoIosAddCircle className="cursor-pointer text-[#0C3108] text-[1.5rem]" />
                      <FaEdit className="cursor-pointer text-[#0C1460] text-[1.5rem]" />
                      <MdDelete className="cursor-pointer text-[#510707] text-[1.5rem]" />
                    </div> */}
                   <div className="flex justify-center space-x-2">
                    <FormModal
                      Table='comments'
                      Type='create'
                      Icon={IoIosAddCircle} // Pass the actual icon component
                      Style="cursor-pointer text-[#0C3108] text-[1.5rem]" // Tailwind CSS for styling
                    />

                    <FormModal
                      Table='comments'
                      Type='update'
                      Icon={FaEdit} 
                      id={1}
                      data={"asdasda"}// Pass the actual icon component
                      Style="cursor-pointer text-[#0C1460] text-[1.5rem]" // Fixed the missing bracket here
                    />

                    <FormModal
                      Table='comments'
                      Type='delete'
                      Icon={MdDelete} // Pass the actual icon component
                      Style="cursor-pointer text-[#510707] text-[1.5rem]" // Tailwind CSS for styling
                    />
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between w-full p-4">
        <button className="w-max text-[0.7rem] p-[0.5rem] bg-slate-400">Previous</button>
        <button className="w-max text-[0.7rem] p-[0.5rem] bg-slate-400">Next</button>
      </div>
    </div>
  );
};

export default ManageCommentPage;











