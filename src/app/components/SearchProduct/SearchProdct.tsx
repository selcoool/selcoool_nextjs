import React from 'react';
import { CiSearch } from 'react-icons/ci';

const SearchProdct = () => {
  return (
    <div className="w-[80%] h-[25vh] mx-auto mb-[2rem]  bg-gray-400">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-[1.5rem] text-blue-600 md:text-[2rem] text-center mb-4">
          WHAT ARE YOU LOOKING FOR, MY FRIENDS?
        </h1>
        <div className="flex items-center w-[15rem] lg:w-[22rem] bg-white rounded-md px-2 py-1">
          <CiSearch size={24} className="text-gray-700 hover:font-bold hover:text-white hover:scale-110 cursor-pointer" />
          <input
            type="text"
            placeholder="Search products..."
            className="outline-none bg-transparent flex-grow px-2 py-1 text-neutral-900"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchProdct;
