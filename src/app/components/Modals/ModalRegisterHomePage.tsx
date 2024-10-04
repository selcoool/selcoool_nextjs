'use client'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {closeModalRegisterHomePage } from '../../store/toogleModalSlice';

// interface Props {
//     showRegisterHomePage: boolean;
//     setShowRegisterHomePage: (showRegisterHomePage: boolean) => void;
// }

const ModalRegisterHomePage = () => {
  
    // const handleCloseModal =(e:React.MouseEvent<HTMLDivElement>)=>{
    //     if ((e.target as HTMLDivElement).id === 'wrapper') {
    //         setShowRegisterHomePage(!showRegisterHomePage);
    //      }
    // }

    const isOpenModalRegisterHomePage = useSelector((state: RootState) => state.toogleModal.isOpenModalRegisterHomePage);
    const dispatch = useDispatch<AppDispatch>();
  
    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target instanceof HTMLDivElement && e.target.id === 'wrapper') {
        dispatch(closeModalRegisterHomePage());
      }
    };
  
    if (!isOpenModalRegisterHomePage) return null;

  return (
    <div className='relative z-[9999] flex justify-center w-full h-full'>
    {isOpenModalRegisterHomePage && (
        <div id='wrapper' onClick={handleCloseModal} className='fixed z-10 flex justify-center pt-[10rem] top-0 bottom-0 w-full h-full'>
            <div className='w-fit h-fit pt-4'>
                <form className='w-fit h-fit bg-orange-500 px-4 shadow-md hover:shadow-slate-400 rounded-lg'>
                    <div className='flex items-center justify-center gap-3 relative'>
                        <div className='absolute font-bold text-black right-0 top-1 hover:text-white cursor-pointer' onClick={() => dispatch(closeModalRegisterHomePage())}>X</div>
                    </div>

                    <h1 className='text-center mt-6 pb-2 text-2xl text-white font-bold'>WORK WITH ME</h1>

                    <div className='flex flex-col gap-3 pb-5 pt-5 h-fit w-fit overflow-auto no-scrollbar'>
                        <div className='flex items-center justify-center gap-3'>
                            <label htmlFor="name">Full Name:</label>
                            <input id="name" type='text' className='flex-1 focus:outline-none px-2 p-1 rounded-lg cursor-pointer' placeholder='Enter your name' />
                        </div>

                        <div className='flex items-center justify-center gap-3'>
                            <label htmlFor="account">Email:</label>
                            <input id="account" type='text' className='flex-1 focus:outline-none px-2 p-1 rounded-lg cursor-pointer' placeholder='Enter your email' />
                        </div>

                        <div className='flex items-center justify-center gap-3'>
                                <label >Description:</label>
                                <textarea   className=' flex-1 focus:outline-none px-2 p-1 rounded-lg cursor-pointer' placeholder='Type your request' ></textarea>
                            </div>

                        <div className='flex items-center justify-center gap-3'>
                            <label htmlFor="file">Relevant Files:</label>
                            <input  type="file" className='flex-1 focus:outline-none px-2 p-1 rounded-lg cursor-pointer max-w-[15rem]' />
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

export default ModalRegisterHomePage