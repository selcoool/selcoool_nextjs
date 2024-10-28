import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoIosAddCircle } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'

const ManageMessagePage = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="bg-[#a49845] w-full h-full min-h-[78vh] p-4">
        {/* Title with consistent margin */}
        <div className='flex justify-between items-center mb-4'>
          <h2 className="text-xl font-semibold hidden md:block">Manage Messages</h2>
          {/* Flex container for search and action icons */}
          <div className='flex items-center gap-2 ml-auto'> {/* Added ml-auto to align to the right */}
            <div className='flex items-center gap-2 rounded-full px-4 bg-white'> {/* Adjusted padding */}
              <IoSearch />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-[8.5rem] md:w-[12rem] p-2 bg-transparent outline-none" 
              />
            </div>
            <div className='flex justify-center space-x-2'> {/* Updated spacing */}
              <IoIosAddCircle className='cursor-pointer text-[#4f1a3a] text-[1.8rem]' />
              <FaEdit className='cursor-pointer text-[#4f1a3a] text-[1.8rem]' />
              <MdDelete className='cursor-pointer text-[#4f1a3a] text-[1.8rem]' />
            </div>
          </div>
        </div>

        {/* Wrapper for the table with a fixed height for scrolling */}
        <div className="overflow-y-auto max-h-[65vh] custom-scrollbar">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 border border-gray-300">ID</th>
                <th className="px-4 py-2 border border-gray-300">Message</th>
                {/* Only visible on medium screens (md) and larger */}
                <th className="px-4 py-2 border border-gray-300 hidden md:table-cell">Link</th>
                <th className="px-4 py-2 border border-gray-300 hidden md:table-cell">Status</th>
                <th className="px-4 py-2 border border-gray-300">Adjust</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 20 }).map((_, index) => (
                <tr key={index} className='hover:bg-slate-400'>
                  <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-300">Can you call me back at ....</td>
                  {/* Only visible on medium screens (md) and larger */}
                  <td className="px-4 py-2 border border-gray-300 hidden md:table-cell">
                    https://example.com
                  </td>
                  <td className="px-4 py-2 border border-gray-300 hidden md:table-cell">Inactive</td>
                  <td className="px-4 py-2 border border-gray-300 ">
                    <div className='flex justify-center space-x-2'> {/* Updated spacing */}
                      <IoIosAddCircle className='cursor-pointer text-[#0C3108] text-[1.5rem]' />
                      <FaEdit className='cursor-pointer text-[#0C1460] text-[1.5rem]' />
                      <MdDelete className='cursor-pointer text-[#510707] text-[1.5rem]' />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='flex justify-between w-full p-4'>
        <button className='w-max text-[0.7rem] p-[0.5rem] bg-slate-400'>Previous</button>
        <button className='w-max text-[0.7rem] p-[0.5rem] bg-slate-400'>Next</button>
      </div>
    </div>
  )
}

export default ManageMessagePage