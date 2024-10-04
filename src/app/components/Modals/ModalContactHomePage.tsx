'use client'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {closeModalContactHomePage} from '../../store/toogleModalSlice';

const ModalContactHomePage = () => {

  const isOpenModalContactHomePage = useSelector((state: RootState) => state.toogleModal.isOpenModalContactHomePage);
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === 'wrapper') {
      dispatch(closeModalContactHomePage());
    }
  };

  if (!isOpenModalContactHomePage) return null;


  return (
    <div className='relative z-[9999] flex justify-center w-full h-full '>
      {isOpenModalContactHomePage && (
        <div id='wrapper' onClick={handleCloseModal} className='fixed z-10 flex justify-center pt-[10rem] top-0 bottom-0  w-full h-full'>
          <div className='w-fit h-fit pt-4'>
            <form className='w-fit h-fit bg-red-500 px-4 shadow-md hover:shadow-slate-400 rounded-lg'>
              <div className='flex items-center justify-center gap-3 relative'>
                <div className='absolute font-bold text-black right-0 top-1 hover:text-white  cursor-pointer'  onClick={() => dispatch(closeModalContactHomePage())}>X</div>
              </div>

              <h1 className='text-center mt-6 pb-2 text-2xl text-white font-bold'>CONTACT ME</h1>

              <div className='flex flex-col gap-3 pb-5 pt-5 h-fit w-fit overflow-auto no-scrollbar'>

              <div className='flex items-center justify-center gap-3'>
                  <label>Title:</label>
                  <input type='text' className='flex-1 focus:outline-none px-2 p-1 rounded-lg cursor-pointer' placeholder='Enter your account name' />
                </div>

                <div className='flex items-center justify-center gap-3'>
                  <label>Nick Name or Full Name:</label>
                  <input type='text' className='flex-1 focus:outline-none px-2 p-1 rounded-lg cursor-pointer' placeholder='Enter your name' />
                </div>


                <div className='flex items-center justify-center gap-3'>
                                <label >Description:</label>
                                <textarea   className=' flex-1 focus:outline-none px-2 p-1 rounded-lg cursor-pointer' placeholder='Type your request' ></textarea>
                </div>

               

                <div className='flex items-center justify-end gap-3'>
                  <button type="submit" className='min-w-[90px] w-30 h-[34px] bg-green-500 flex justify-center rounded-md items-center hover:shadow-md hover:shadow-gray-300 cursor-pointer hover:text-white'>Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModalContactHomePage
