"use client";

import React, { useEffect, useState } from 'react';
import Home from './home/page';
import GoogleLogin from '../components_dashboard/GoogleLogin';
import FacebookLogin from '../components_dashboard/FacebookLogin'; // Sửa lỗi import
import Cookies from 'js-cookie';
import { ImCross } from 'react-icons/im';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ cookie
    const googleLoggedIn = Cookies.get('google_logged_in') === 'true';
    const fbLoggedIn = Cookies.get('fb_logged_in') === 'true';

    // Nếu chưa đăng nhập thì hiển thị modal
    if (!googleLoggedIn && !fbLoggedIn) {
      setIsModalOpen(true);
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
            <ImCross onClick={closeModal} className='absolute top-[0.5rem] right-[0.5rem] w-[1rem] h-[1rem] text-gray-600 cursor-pointer' />
            <h2 className="text-lg font-bold">Welcome!</h2>
            <p>Please login with one of the options below:</p>
            <div className="flex flex-col items-center mt-4 space-y-2">
              <GoogleLogin  /> {/* Thêm onSuccess */}
              <FacebookLogin  /> {/* Thêm onSuccess */}
            </div>
          </div>
        </div>
      )}
      <Home />
    </div>
  );
};

export default HomePage;








// "use client";

// import React, { useEffect, useState } from 'react';
// import Home from './home/page'
// import GoogleLogin from '../components_dashboard/GoogleLogin';
// import FacebookLogin from '../components_dashboard/FacebookLogin';
// import Cookies from 'js-cookie';
// import { ImCross } from 'react-icons/im';


// console.log("Google Client ID:");
// // console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
// // console.log("Facebook Client ID:", process.env.FACEBOOK_CLIENT_ID);
// const HomePage = () => {


//     const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     // Kiểm tra trạng thái đăng nhập từ cookie
//     const googleLoggedIn = Cookies.get('google_logged_in') === 'true';
//     const fbLoggedIn = Cookies.get('fb_logged_in') === 'true';

//     // Nếu chưa đăng nhập thì hiển thị modal
//     if (!googleLoggedIn && !fbLoggedIn) {
//       setIsModalOpen(true);
//     }
//   }, []);

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
//   return (
//     <div>
//             {isModalOpen && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
//              <ImCross onClick={closeModal} className='absolute top-[0.5rem] right-[0.5rem] w-[1rem] h-[1rem] text-gray-600 cursor-pointer' />
//              <h2 className="text-lg font-bold">Welcome!</h2>
//              <p>Please login with one of the options below:</p>
//              <div className="flex flex-col items-center mt-4 space-y-2">
//              <GoogleLogin /><FacebookLogin />
//              </div>
//            </div>
//          </div>
//        )} 
//       <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
//       <ImCross onClick={closeModal} className='absolute top-[0.5rem] right-[0.5rem] w-[1rem] h-[1rem] text-gray-600 cursor-pointer' />
//       <div className='flex flex-col items-center mt-4 space-y-2'>
//       <GoogleLogin /><FacebookLogin />
//       </div>
        
//     <Home/>
  
//     </div>
//   </div>
//   )
// }

// export default HomePage
