"use client";

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  picture: {
    data: {
      url: string;
    };
  };
}

const FacebookLogin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fbLoggedIn = Cookies.get('fb_logged_in') === 'true';
    const storedUserInfo = Cookies.get('fb_user_info');

    if (fbLoggedIn && storedUserInfo) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(storedUserInfo));
      // router.push('/profile'); // Redirect to profile after login
    } else {
      loadFacebookSDK();
    }
  });

  const loadFacebookSDK = () => {
    return new Promise<void>((resolve) => {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '1279663226031101', // Replace with your App ID
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v10.0',
        });
        window.FB.getLoginStatus((response: any) => {
          if (response.status === 'connected') {
            window.FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo: UserInfo) => {
              setUserInfo(userInfo);
              Cookies.set('fb_user_info', JSON.stringify(userInfo), { expires: 7 });
              Cookies.set('fb_logged_in', 'true', { expires: 7 });
              setIsLoggedIn(true);
              router.push('/profile'); // Redirect to profile after login
            });
          }
          resolve();
        });
      };

      if (!document.getElementById('facebook-jssdk')) {
        const js = document.createElement('script');
        js.id = 'facebook-jssdk';
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        document.body.appendChild(js);
      }
    });
  };

  const handleLogin = () => {
    if (window.FB) {
      window.FB.login((response: any) => {
        if (response.authResponse) {
          window.FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo: UserInfo) => {
            setUserInfo(userInfo);
            Cookies.set('fb_user_info', JSON.stringify(userInfo), { expires: 7 });
            Cookies.set('fb_logged_in', 'true', { expires: 7 });
            setIsLoggedIn(true);
            router.push('/profile'); // Redirect to profile after login
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      }, { scope: 'public_profile,email' });
    } else {
      console.log('Facebook SDK is not loaded.');
    }
  };

  const handleLogout = () => {
    Cookies.remove('fb_logged_in');
    Cookies.remove('fb_user_info');
    setIsLoggedIn(false);
    setUserInfo(null);
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {isLoggedIn && userInfo ? (
        <div className="flex items-center space-x-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
          <img src={userInfo.picture?.data.url} alt="Profile" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col">
            <span className="font-bold text-gray-700">{userInfo.name}</span>
            <span className="text-sm text-gray-500">{userInfo.email}</span>
          </div>
          <button onClick={handleLogout} className="text-blue-600 hover:underline">
            Log Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="flex items-center  px-4 py-2 space-x-[1rem] bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="Facebook Logo"
            className="w-5 h-5"
          />
          <span>Login with Facebook</span>
        
        </button>
      )}
    </div>
  );
};

export default FacebookLogin;



// // app/components/FacebookLogin.tsx
// "use client";

// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import { useRouter } from 'next/navigation';

// declare global {
//   interface Window {
//     fbAsyncInit: () => void;
//     FB: any;
//   }
// }

// interface UserInfo {
//   id: string;
//   name: string;
//   email: string;
//   picture: {
//     data: {
//       url: string;
//     };
//   };
// }

// const FacebookLogin: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//   const router = useRouter();


//   useEffect(() => {
//     const fbLoggedIn = Cookies.get('fb_logged_in') === 'true';
//     const storedUserInfo = Cookies.get('fb_user_info');

//     if (fbLoggedIn && storedUserInfo) {
//       setIsLoggedIn(true);
//       setUserInfo(JSON.parse(storedUserInfo));
//       router.push('/profile'); // Redirect to profile after login
//     } else {
//       loadFacebookSDK();
//     }
//   }, []);

//   const loadFacebookSDK = () => {
//     return new Promise<void>((resolve) => {
//       window.fbAsyncInit = function () {
//         window.FB.init({
//           appId: '1279663226031101', // Replace with your App ID
//           autoLogAppEvents: true,
//           xfbml: true,
//           version: 'v10.0',
//         });
//         window.FB.getLoginStatus((response: any) => {
//           if (response.status === 'connected') {
//             window.FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo: UserInfo) => {
//               setUserInfo(userInfo);
//               Cookies.set('fb_user_info', JSON.stringify(userInfo), { expires: 7 });
//               Cookies.set('fb_logged_in', 'true', { expires: 7 });
//               setIsLoggedIn(true);
//               router.push('/profile'); // Redirect to profile after login
//             });
//           }
//           resolve();
//         });
//       };

//       if (!document.getElementById('facebook-jssdk')) {
//         const js = document.createElement('script');
//         js.id = 'facebook-jssdk';
//         js.src = 'https://connect.facebook.net/en_US/sdk.js';
//         document.body.appendChild(js);
//       }
//     });
//   };

//   const handleLogin = () => {
//     if (window.FB) {
//       window.FB.login((response: any) => {
//         if (response.authResponse) {
//           window.FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo: UserInfo) => {
//             setUserInfo(userInfo);
//             Cookies.set('fb_user_info', JSON.stringify(userInfo), { expires: 7 });
//             Cookies.set('fb_logged_in', 'true', { expires: 7 });
//             setIsLoggedIn(true);
//           });
//         } else {
//           console.log('User cancelled login or did not fully authorize.');
//         }
//       }, { scope: 'public_profile,email' });
//     } else {
//       console.log('Facebook SDK is not loaded.');
//     }
//   };

//   const handleLogout = () => {
//     Cookies.remove('fb_logged_in');
//     Cookies.remove('fb_user_info');
//     setIsLoggedIn(false);
//     setUserInfo(null);
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       {isLoggedIn && userInfo ? (
//         <div className="flex items-center space-x-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
//           <img src={userInfo.picture?.data.url} alt="Profile" className="w-10 h-10 rounded-full" />
//           <div className="flex flex-col">
//             <span className="font-bold text-gray-700">{userInfo.name}</span>
//             <span className="text-sm text-gray-500">{userInfo.email}</span>
//           </div>
//           <button onClick={handleLogout} className="text-blue-600 hover:underline">
//             Log Out
//           </button>
//         </div>
//       ) : (
//         <button
//           onClick={handleLogin}
//           className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
//         >
//           <span>Login with Facebook</span>
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
//             alt="Facebook Logo"
//             className="w-5 h-5"
//           />
//         </button>
//       )}
//     </div>
//   );
// };

// export default FacebookLogin;





// "use client";
// // app/components/FacebookLogin.tsx
// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';

// declare global {
//   interface Window {
//     fbAsyncInit: () => void;
//     FB: any;
//   }
// }

// interface UserInfo {
//   id: string;
//   name: string;
//   email: string;
//   picture: {
//     data: {
//       url: string;
//     };
//   };
// }

// const FacebookLogin: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

//   useEffect(() => {
//     // Check for existing login state in cookies
//     const fbLoggedIn = Cookies.get('fb_logged_in') === 'true';
//     const storedUserInfo = Cookies.get('fb_user_info');

//     if (fbLoggedIn && storedUserInfo) {
//       setIsLoggedIn(true);
//       setUserInfo(JSON.parse(storedUserInfo));
//     } else {
//       // Load the Facebook SDK and check the login status
//       loadFacebookSDK();
//     }
//   }, []);

//   const loadFacebookSDK = () => {
//     return new Promise<void>((resolve) => {
//       window.fbAsyncInit = function () {
//         window.FB.init({
//           appId: '1279663226031101', // Replace with your App ID
//           autoLogAppEvents: true,
//           xfbml: true,
//           version: 'v10.0',
//         });
//         // Check the login status when SDK is loaded
//         window.FB.getLoginStatus((response: any) => {
//           if (response.status === 'connected') {
//             window.FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo: UserInfo) => {
//               setUserInfo(userInfo);
//               // Store user info and login state in cookies
//               Cookies.set('fb_user_info', JSON.stringify(userInfo), { expires: 7 });
//               Cookies.set('fb_logged_in', 'true', { expires: 7 });
//               setIsLoggedIn(true);
//             });
//           }
//           resolve();
//         });
//       };

//       if (!document.getElementById('facebook-jssdk')) {
//         const js = document.createElement('script');
//         js.id = 'facebook-jssdk';
//         js.src = 'https://connect.facebook.net/en_US/sdk.js';
//         document.body.appendChild(js);
//       }
//     });
//   };

//   const handleLogin = () => {
//     if (window.FB) {
//       window.FB.login((response: any) => {
//         if (response.authResponse) {
//           window.FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo: UserInfo) => {
//             setUserInfo(userInfo);
//             // Store user info and login state in cookies
//             Cookies.set('fb_user_info', JSON.stringify(userInfo), { expires: 7 });
//             Cookies.set('fb_logged_in', 'true', { expires: 7 });
//             setIsLoggedIn(true);
//           });
//         } else {
//           console.log('User cancelled login or did not fully authorize.');
//         }
//       }, { scope: 'public_profile,email' });
//     } else {
//       console.log('Facebook SDK is not loaded.');
//     }
//   };

//   const handleLogout = () => {
//     Cookies.remove('fb_logged_in');
//     Cookies.remove('fb_user_info');
//     setIsLoggedIn(false);
//     setUserInfo(null);
//   };

//   const handleGetUserId = () => {
//     if (userInfo) {
//       alert(`Your User ID is: ${userInfo.id}`);
//     } else {
//       alert('User is not logged in.');
//     }
//   };

//   return (
//     <div>
//       {isLoggedIn && userInfo ? (
//         <div>
//           <h3>Welcome, {userInfo.name}!</h3>
//           <p>Email: {userInfo.email}</p>
//           <img src={userInfo.picture?.data?.url} alt="Profile" width={100} height={100} />
//           <button onClick={handleLogout}>Log out</button>
//           <button onClick={handleGetUserId}>Get User ID</button>
//         </div>
//       ) : (
//         <button onClick={handleLogin}>Login with Facebook</button>
//       )}
//     </div>
//   );
// };

// export default FacebookLogin;


// "use client"

// "use client";
// // app/components/FacebookLogin.tsx
// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';

// declare global {
//   interface Window {
//     fbAsyncInit: () => void;
//     FB: any;
//   }
// }

// interface UserInfo {
//   id: string;
//   name: string;
//   email: string;
//   picture: {
//     data: {
//       url: string;
//     };
//   };
// }

// const FacebookLogin: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

//   useEffect(() => {
//     // Check for existing login state in cookies
//     const fbLoggedIn = Cookies.get('fb_logged_in') === 'true';
//     const storedUserInfo = Cookies.get('fb_user_info');
    
//     if (fbLoggedIn && storedUserInfo) {
//       setIsLoggedIn(true);
//       setUserInfo(JSON.parse(storedUserInfo)); // Set user info from cookies
//     }

//     // Load the Facebook SDK
//     const loadFacebookSDK = () => {
//       return new Promise<void>((resolve) => {
//         window.fbAsyncInit = function () {
//           window.FB.init({
//             appId: '1279663226031101', // Replace with your App ID
//             autoLogAppEvents: true,
//             xfbml: true,
//             version: 'v20.0',
//           });
//           resolve();
//         };

//         if (!document.getElementById('facebook-jssdk')) {
//           const js = document.createElement('script');
//           js.id = 'facebook-jssdk';
//           js.src = 'https://connect.facebook.net/en_US/sdk.js';
//           document.body.appendChild(js);
//         }
//       });
//     };

//     loadFacebookSDK();
//   }, []);

//   const handleLogin = () => {
//     if (window.FB) {
//       window.FB.getLoginStatus((response: any) => {
//         if (response.status === 'connected') {
//           window.FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo: UserInfo) => {
//             setUserInfo(userInfo);
//             // Store user info and login state in cookies
//             Cookies.set('fb_user_info', JSON.stringify(userInfo), { expires: 7 }); // Expires in 7 days
//             Cookies.set('fb_logged_in', 'true', { expires: 7 });
//             setIsLoggedIn(true);
//           });
//         } else {
//           // User not logged in, initiate login
//           window.FB.login((response: any) => {
//             if (response.authResponse) {
//               window.FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo: UserInfo) => {
//                 setUserInfo(userInfo);
//                 // Store user info and login state in cookies
//                 Cookies.set('fb_user_info', JSON.stringify(userInfo), { expires: 7 });
//                 Cookies.set('fb_logged_in', 'true', { expires: 7 });
//                 setIsLoggedIn(true);
//               });
//             } else {
//               console.log('User cancelled login or did not fully authorize.');
//             }
//           }, { scope: 'public_profile,email' });
//         }
//       });
//     } else {
//       console.log('Facebook SDK is not loaded.');
//     }
//   };

//   const handleLogout = () => {
//     // Remove cookies on logout
//     Cookies.remove('fb_logged_in');
//     Cookies.remove('fb_user_info');
//     setIsLoggedIn(false);
//     setUserInfo(null);
//   };

//   return (
//     <div>
//       {isLoggedIn && userInfo ? (
//         <div>
//           <h3>Welcome, {userInfo.name}!</h3>
//           <p>Email: {userInfo.email}</p>
//           <img src={userInfo.picture.data.url} alt="Profile" width={100} height={100} />
//           <button onClick={handleLogout}>Log out</button>
//         </div>
//       ) : (
//         <button onClick={handleLogin}>Login with Facebook</button>
//       )}
//     </div>
//   );
// };

// export default FacebookLogin;


// "use client"
// // app/components/FacebookLogin.tsx
// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie'; // Nhập thư viện Cookies

// declare global {
//   interface Window {
//     fbAsyncInit: () => void;
//     FB: any;
//   }
// }

// interface UserInfo {
//   id: string;
//   name: string;
//   email: string;
//   picture: {
//     data: {
//       url: string; // Cập nhật kiểu dữ liệu cho picture
//     };
//   };
// }

// const FacebookLogin: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

//   useEffect(() => {
//     // Kiểm tra cookies để xác định trạng thái đăng nhập
//     const fbLoggedIn = Cookies.get('fb_logged_in') === 'true';
//     const storedUserInfo = Cookies.get('fb_user_info');
//     if (fbLoggedIn && storedUserInfo) {
//       setIsLoggedIn(true);
//       setUserInfo(JSON.parse(storedUserInfo));
//     }

//     const loadFacebookSDK = () => {
//       return new Promise<void>((resolve) => {
//         window.fbAsyncInit = function () {
//           window.FB.init({
//             appId: '1279663226031101', // Thay thế bằng App ID của bạn
//             autoLogAppEvents: true,
//             xfbml: true,
//             version: 'v10.0',
//           });
//           resolve();
//         };

//         if (!document.getElementById('facebook-jssdk')) {
//           const js = document.createElement('script');
//           js.id = 'facebook-jssdk';
//           js.src = 'https://connect.facebook.net/en_US/sdk.js';
//           document.body.appendChild(js);
//         }
//       });
//     };

//     loadFacebookSDK();
//   }, []);

//   const handleLogin = () => {
//     if (window.FB) {
//       window.FB.getLoginStatus((response: any) => {
//         if (response.status === 'connected') {
//           window.FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo: UserInfo) => {
//             setUserInfo(userInfo);
//             // Lưu thông tin vào cookies
//             Cookies.set('fb_user_info', JSON.stringify(userInfo), { expires: 7 }); // Hết hạn sau 7 ngày
//             Cookies.set('fb_logged_in', 'true', { expires: 7 });
//             setIsLoggedIn(true);
//           });
//         } else {
//           window.FB.login(
//             (response: any) => {
//               if (response.authResponse) {
//                 window.FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo: UserInfo) => {
//                   setUserInfo(userInfo);
//                   // Lưu thông tin vào cookies
//                   Cookies.set('fb_user_info', JSON.stringify(userInfo), { expires: 7 });
//                   Cookies.set('fb_logged_in', 'true', { expires: 7 });
//                   setIsLoggedIn(true);
//                 });
//               } else {
//                 console.log('User cancelled login or did not fully authorize.');
//               }
//             },
//             { scope: 'public_profile,email' }
//           );
//         }
//       });
//     } else {
//       console.log('Facebook SDK is not loaded.');
//     }
//   };

//   const handleLogout = () => {
//     // Xóa cookies khi đăng xuất
//     Cookies.remove('fb_logged_in');
//     Cookies.remove('fb_user_info');
//     setIsLoggedIn(false);
//     setUserInfo(null);
//   };

//   return (
//     <div>
//       {isLoggedIn && userInfo ? (
//         <div>
//              <p>ID: {userInfo.id}</p>
//           <h3>Welcome, {userInfo.name}!</h3>
//           <p>Email: {userInfo.email}</p>
//           <img src={userInfo.picture.data.url} alt="Profile" width={100} height={100} /> {/* Hiển thị hình ảnh đại diện */}
//           <button onClick={handleLogout}>Log out</button>
//         </div>
//       ) : (
//         <button onClick={handleLogin}>Login with Facebook</button>
//       )}
//     </div>
//   );
// };

// export default FacebookLogin;



// "use client"
// // app/components/FacebookLogin.tsx
// import { useEffect, useState } from 'react';

// declare global {
//   interface Window {
//     fbAsyncInit: () => void;
//     FB: any;
//   }
// }

// interface UserInfo {
//   id: string;
//   name: string;
//   email: string;
//   picture: {
//     data: {
//       url: string; // Cập nhật kiểu dữ liệu cho picture
//     };
//   };
// }

// const FacebookLogin: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

//   useEffect(() => {
//     const fbLoggedIn = localStorage.getItem('fb_logged_in') === 'true';
//     const storedUserInfo = localStorage.getItem('fb_user_info');
//     if (fbLoggedIn && storedUserInfo) {
//       setIsLoggedIn(true);
//       setUserInfo(JSON.parse(storedUserInfo));
//     }

//     const loadFacebookSDK = () => {
//       return new Promise<void>((resolve) => {
//         window.fbAsyncInit = function () {
//           window.FB.init({
//             appId: '1279663226031101', // Thay thế bằng App ID của bạn
//             autoLogAppEvents: true,
//             xfbml: true,
//             version: 'v10.0',
//           });
//           resolve();
//         };

//         if (!document.getElementById('facebook-jssdk')) {
//           const js = document.createElement('script');
//           js.id = 'facebook-jssdk';
//           js.src = 'https://connect.facebook.net/en_US/sdk.js';
//           document.body.appendChild(js);
//         }
//       });
//     };

//     loadFacebookSDK();
//   }, []);

//   const handleLogin = () => {
//     if (window.FB) {
//       window.FB.getLoginStatus((response: any) => {
//         if (response.status === 'connected') {
//           window.FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo: UserInfo) => {
//             setUserInfo(userInfo);
//             localStorage.setItem('fb_user_info', JSON.stringify(userInfo));
//             localStorage.setItem('fb_logged_in', 'true');
//             setIsLoggedIn(true);
//           });
//         } else {
//           window.FB.login(
//             (response: any) => {
//               if (response.authResponse) {
//                 window.FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo: UserInfo) => {
//                   setUserInfo(userInfo);
//                   localStorage.setItem('fb_user_info', JSON.stringify(userInfo));
//                   localStorage.setItem('fb_logged_in', 'true');
//                   setIsLoggedIn(true);
//                 });
//               } else {
//                 console.log('User cancelled login or did not fully authorize.');
//               }
//             },
//             { scope: 'public_profile,email' }
//           );
//         }
//       });
//     } else {
//       console.log('Facebook SDK is not loaded.');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('fb_logged_in');
//     localStorage.removeItem('fb_user_info');
//     setIsLoggedIn(false);
//     setUserInfo(null);
//   };

//   return (
//     <div>
//       {isLoggedIn && userInfo ? (
//         <div>
//           <h3>Welcome, {userInfo.name}!</h3>
//           <p>Email: {userInfo.email}</p>
//           <img src={userInfo.picture.data.url} alt="Profile" width={100} height={100} /> {/* Hiển thị hình ảnh đại diện */}
//           <button onClick={handleLogout}>Log out</button>
//         </div>
//       ) : (
//         <button onClick={handleLogin}>Login with Facebook</button>
//       )}
//     </div>
//   );
// };

// export default FacebookLogin;




// "use client"
// // app/components/FacebookLogin.tsx
// import { useEffect, useState } from 'react';

// declare global {
//   interface Window {
//     fbAsyncInit: () => void;
//     FB: any;
//   }
// }

// const FacebookLogin: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   useEffect(() => {
//     // Kiểm tra trạng thái đăng nhập từ localStorage
//     const fbLoggedIn = localStorage.getItem('fb_logged_in') === 'true';
//     setIsLoggedIn(fbLoggedIn);

//     const loadFacebookSDK = () => {
//       return new Promise<void>((resolve) => {
//         window.fbAsyncInit = function () {
//           window.FB.init({
//             appId: '1279663226031101', // Thay thế bằng App ID của bạn
//             autoLogAppEvents: true,
//             xfbml: true,
//             version: 'v10.0',
//           });
//           resolve();
//         };

//         if (!document.getElementById('facebook-jssdk')) {
//           const js = document.createElement('script');
//           js.id = 'facebook-jssdk';
//           js.src = 'https://connect.facebook.net/en_US/sdk.js';
//           document.body.appendChild(js);
//         }
//       });
//     };

//     loadFacebookSDK();
//   }, []);

//   const handleLogin = () => {
//     if (window.FB) {
//       window.FB.getLoginStatus((response: any) => {
//         if (response.status === 'connected') {
//           // Người dùng đã đăng nhập Facebook
//           setIsLoggedIn(true);
//           localStorage.setItem('fb_logged_in', 'true');
//           console.log('User already logged in');
//         } else {
//           // Người dùng chưa đăng nhập, thực hiện đăng nhập
//           window.FB.login(
//             (response: any) => {
//               if (response.authResponse) {
//                 window.FB.api('/me', { fields: 'id,name,email' }, (userInfo: any) => {
//                   console.log('User ID:', userInfo.id);
//                   console.log('Name:', userInfo.name);
//                   console.log('Email:', userInfo.email);
//                   localStorage.setItem('fb_logged_in', 'true');
//                   setIsLoggedIn(true);
//                 });
//               } else {
//                 console.log('User cancelled login or did not fully authorize.');
//               }
//             },
//             { scope: 'public_profile,email' }
//           );
//         }
//       });
//     } else {
//       console.log('Facebook SDK is not loaded.');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('fb_logged_in');
//     setIsLoggedIn(false);
//   };

//   return (
//     <div>
//       {isLoggedIn ? (
//         <button onClick={handleLogout}>Log out</button>
//       ) : (
//         <button onClick={handleLogin}>Login with Facebook</button>
//       )}
//     </div>
//   );
// };

// export default FacebookLogin;



// "use client"
// // app/components/FacebookLogin.tsx
// import { useEffect, useState } from 'react';

// declare global {
//   interface Window {
//     fbAsyncInit: () => void;
//     FB: any;
//   }
// }

// const FacebookLogin: React.FC = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   useEffect(() => {
//     const loadFacebookSDK = () => {
//       return new Promise<void>((resolve) => {
//         window.fbAsyncInit = function () {
//           window.FB.init({
//             appId: '1279663226031101', // Thay thế bằng App ID của bạn
//             autoLogAppEvents: true,
//             xfbml: true,
//             version: 'v10.0', // Phiên bản API Facebook
//           });
//           resolve();
//         };

//         // Load SDK Facebook nếu chưa tồn tại
//         if (!document.getElementById('facebook-jssdk')) {
//           const js = document.createElement('script');
//           js.id = 'facebook-jssdk';
//           js.src = 'https://connect.facebook.net/en_US/sdk.js';
//           document.body.appendChild(js);
//         }
//       });
//     };

//     loadFacebookSDK();
//   }, []);

// //   const handleLogin = async () => {
// //     if (window.FB) {
// //       window.FB.login(
// //         (response: any) => {
// //           if (response.authResponse) {
// //             window.FB.api('/me', { fields: 'id,name,email' }, (userInfo: any) => {
// //               console.log('ID người dùng:', userInfo.id);
// //               console.log('Tên:', userInfo.name);
// //               console.log('Email:', userInfo.email);
// //             });
// //           } else {
// //             console.log('Người dùng đã hủy đăng nhập hoặc không xác thực.');
// //           }
// //         },
// //         { scope: 'public_profile,email' }
// //       );
// //     } else {
// //       console.log('Facebook SDK chưa được tải.');
// //     }
// //   };

// const handleLogin = () => {
//     if (window.FB) {
//       window.FB.login(
//         (response: any) => {
//           if (response.authResponse) {
//             window.FB.api('/me', { fields: 'id,name,email' }, (userInfo: any) => {
//               console.log('User ID:', userInfo.id);
//               console.log('Name:', userInfo.name);
//               console.log('Email:', userInfo.email);
//               localStorage.setItem('fb_logged_in', 'true');
//               setIsLoggedIn(true);
//             });
//           } else {
//             console.log('User cancelled login or did not fully authorize.');
//           }
//         },
//         { scope: 'public_profile,email' }
//       );
//     } else {
//       console.log('Facebook SDK is not loaded.');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('fb_logged_in');
//     setIsLoggedIn(false);
//   };

//   return (
//     <div>
//     {isLoggedIn ? (
//       <button onClick={handleLogout}>Log out</button>
//     ) : (
//       <button onClick={handleLogin}>Login with Facebook</button>
//     )}
//   </div>
//   );
// };

// export default FacebookLogin;

