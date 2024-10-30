"use client";

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    google?: any;
  }
}

interface UserInfo {
  name: string;
  email: string;
  picture: string;
}

const GoogleLogin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    const googleLoggedIn = Cookies.get('google_logged_in') === 'true';
    const storedUserInfo = Cookies.get('google_user_info');

    if (googleLoggedIn && storedUserInfo) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(storedUserInfo));
      // Uncomment to redirect if already logged in
      // router.push('/profile');
    } else {
      loadGoogleSDK();
    }
  }, [router]);

  const loadGoogleSDK = () => {
    const handleCredentialResponse = (response: any) => {
      const { credential } = response;
      const user = JSON.parse(atob(credential.split('.')[1]));

      const userInfo: UserInfo = {
        name: user.name,
        email: user.email,
        picture: user.picture,
      };

      // Store user info and login state in cookies
      setUserInfo(userInfo);
      Cookies.set('google_user_info', JSON.stringify(userInfo), { expires: 7 });
      Cookies.set('google_logged_in', 'true', { expires: 7 });
      setIsLoggedIn(true);
      router.push('/profile'); // Redirect after login
    };

    const initializeGoogle = () => {
      window.google.accounts.id.initialize({
        client_id: "404416305487-034gh1j7ngid1c6sa1f6g9nqok6iu9ru.apps.googleusercontent.com"!, // Ensure this is correctly set
        callback: handleCredentialResponse,
      });
    };

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = initializeGoogle;
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  };

  const handleLogout = () => {
    Cookies.remove('google_logged_in');
    Cookies.remove('google_user_info');
    setIsLoggedIn(false);
    setUserInfo(null);
    router.push('/');
  };

  const handleGoogleLogin = () => {
    if (window.google) {
      window.google.accounts.id.prompt(); // Show the Google sign-in dialog
    } else {
      console.error("Google SDK not loaded.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {isLoggedIn && userInfo ? (
        <div className="flex items-center space-x-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
          <img src={userInfo.picture} alt="Profile" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col">
            <span className="font-bold text-gray-700">{userInfo.name}</span>
            <span className="font-bold text-gray-700">{userInfo.email}</span>
          </div>
          <button onClick={handleLogout} className="text-blue-600 hover:underline">
            Log Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="flex items-center px-4 py-2 space-x-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          <img src="https://i.pinimg.com/564x/fb/52/e3/fb52e39c5910bdbcc3b98d58d6ca6944--softball-catcher-avatar.jpg" alt="Google" className="w-5 h-5 rounded-full" />
          <span>Login with Google</span>
        </button>
      )}
    </div>
  );
};

export default GoogleLogin;





// "use client"; 

// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import { useRouter } from 'next/navigation';

// declare global {
//   interface Window {
//     google?: any;
//   }
// }

// interface UserInfo {
//   name: string;
//   email: string;
//   picture: string;
// }

// const GoogleLogin: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const googleLoggedIn = Cookies.get('google_logged_in') === 'true';
//     const storedUserInfo = Cookies.get('google_user_info');

//     if (googleLoggedIn && storedUserInfo) {
//       setIsLoggedIn(true);
//       setUserInfo(JSON.parse(storedUserInfo));
//       // Uncomment to redirect if already logged in
//       // router.push('/profile'); 
//     } else {
//       loadGoogleSDK();
//     }
//   }, [router]); // Added router to dependencies

//   const loadGoogleSDK = () => {
//     const handleCredentialResponse = (response: any) => {
//       const { credential } = response;
//       const user = JSON.parse(atob(credential.split('.')[1]));

//       const userInfo: UserInfo = {
//         name: user.name,
//         email: user.email,
//         picture: user.picture,
//       };

//       // Store user info and login state in cookies
//       setUserInfo(userInfo);
//       Cookies.set('google_user_info', JSON.stringify(userInfo), { expires: 7 });
//       Cookies.set('google_logged_in', 'true', { expires: 7 });
//       setIsLoggedIn(true);
//       router.push('/profile'); // Redirect after login
//     };

//     const initializeGoogle = () => {
//       window.google.accounts.id.initialize({
//         client_id: process.env.GOOGLE_CLIENT_ID!,
//         callback: handleCredentialResponse,
//       });
//     };

//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.onload = initializeGoogle;
//     document.body.appendChild(script);

//     // Cleanup script on component unmount
//     return () => {
//       document.body.removeChild(script);
//     };
//   };

//   const handleLogout = () => {
//     Cookies.remove('google_logged_in');
//     Cookies.remove('google_user_info');
//     setIsLoggedIn(false);
//     setUserInfo(null);
//     router.push('/');
//   };

//   const handleGoogleLogin = () => {
//     window.google.accounts.id.prompt(); // Show the Google sign-in dialog
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       {isLoggedIn && userInfo ? (
//         <div className="flex items-center space-x-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
//           <img src={userInfo.picture} alt="Profile" className="w-10 h-10 rounded-full" />
//           <div className="flex flex-col">
//           <span className="font-bold text-gray-700">{userInfo.name}</span>
//             <span className="font-bold text-gray-700">{userInfo.email}</span>
//           </div>
//           <button onClick={handleLogout} className="text-blue-600 hover:underline">
//             Log Out
//           </button>
//         </div>
//       ) : (
//         <button 
//           onClick={handleGoogleLogin}
//           className="flex items-center px-4 py-2 space-x-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
//         >
//           <img src="https://i.pinimg.com/564x/fb/52/e3/fb52e39c5910bdbcc3b98d58d6ca6944--softball-catcher-avatar.jpg" alt="Google" className="w-5 h-5 rounded-full" />
//           <span>Login with Google</span>
//         </button>
//       )}
//     </div>
//   );
// };

// export default GoogleLogin;


// "use client"; 

// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import { useRouter } from 'next/navigation';

// declare global {
//   interface Window {
//     google?: any;
//   }
// }

// interface UserInfo {
//   name: string;
//   email: string;
//   picture: string;
// }

// const GoogleLogin: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const googleLoggedIn = Cookies.get('google_logged_in') === 'true';
//     const storedUserInfo = Cookies.get('google_user_info');

//     if (googleLoggedIn && storedUserInfo) {
//       setIsLoggedIn(true);
//       setUserInfo(JSON.parse(storedUserInfo));
//       // Uncomment to redirect if already logged in
//       // router.push('/profile'); 
//     } else {
//       loadGoogleSDK();
//     }
//   });

//   const loadGoogleSDK = () => {
//     const handleCredentialResponse = (response: any) => {
//       const { credential } = response;
//       const user = JSON.parse(atob(credential.split('.')[1]));

//       const userInfo: UserInfo = {
//         name: user.name,
//         email: user.email,
//         picture: user.picture,
//       };

//       // Store user info and login state in cookies
//       setUserInfo(userInfo);
//       Cookies.set('google_user_info', JSON.stringify(userInfo), { expires: 7 });
//       Cookies.set('google_logged_in', 'true', { expires: 7 });
//       setIsLoggedIn(true);
//       router.push('/profile'); // Redirect after login
//     };

//     const initializeGoogle = () => {
//       window.google.accounts.id.initialize({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
//         callback: handleCredentialResponse,
//       });
//     };

//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.onload = initializeGoogle;
//     document.body.appendChild(script);

//     // Cleanup script on component unmount
//     return () => {
//       document.body.removeChild(script);
//     };
//   };

//   const handleLogout = () => {
//     Cookies.remove('google_logged_in');
//     Cookies.remove('google_user_info');
//     setIsLoggedIn(false);
//     setUserInfo(null);
//     router.push('/');
//   };

//   const handleGoogleLogin = () => {
//     window.google.accounts.id.prompt(); // Show the Google sign-in dialog
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       {isLoggedIn && userInfo ? (
//         <div className="flex items-center space-x-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
//           <img src={userInfo.picture} alt="Profile" className="w-10 h-10 rounded-full" />
//           <div className="flex flex-col">
//             <span className="font-bold text-gray-700 font-">{userInfo.name}</span>
//             <span className="font-bold text-gray-700">{userInfo.email}</span>
//           </div>
//           <button onClick={handleLogout} className="text-blue-600 hover:underline">
//             Log Out
//           </button>
//         </div>
//       ) : (
//         <button 
//           onClick={handleGoogleLogin}
//           className="flex items-center  px-4 py-2 space-x-[1rem] bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
//         >
//           <img src="https://i.pinimg.com/564x/fb/52/e3/fb52e39c5910bdbcc3b98d58d6ca6944--softball-catcher-avatar.jpg" alt="Google" className="w-5 h-5 rounded-full" />
         
//           <span> Login with Google</span>
//         </button>
//       )}
//     </div>
//   );
// };

// export default GoogleLogin;










// "use client";
// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';

// declare global {
//   interface Window {
//     google?: any;
//   }
// }

// interface UserInfo {
//   name: string;
//   email: string;
//   picture: string;
// }

// const GoogleLogin: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

//   useEffect(() => {
//     // Check for existing login state in cookies
//     const googleLoggedIn = Cookies.get('google_logged_in') === 'true';
//     const storedUserInfo = Cookies.get('google_user_info');

//     if (googleLoggedIn && storedUserInfo) {
//       setIsLoggedIn(true);
//       setUserInfo(JSON.parse(storedUserInfo));
//     } else {
//       loadGoogleSDK();
//     }
//   }, []);

//   const loadGoogleSDK = () => {
//     const handleCredentialResponse = (response: any) => {
//       const { credential } = response;
//       const user = JSON.parse(atob(credential.split('.')[1]));

//       const userInfo: UserInfo = {
//         name: user.name,
//         email: user.email,
//         picture: user.picture,
//       };

//       setUserInfo(userInfo);
//       Cookies.set('google_user_info', JSON.stringify(userInfo), { expires: 7 });
//       Cookies.set('google_logged_in', 'true', { expires: 7 });
//       setIsLoggedIn(true);

//       // window.location.href = '/profile'; // Redirect to profile page
//     };

//     const initializeGoogle = () => {
//       window.google.accounts.id.initialize({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
//         callback: handleCredentialResponse,
//       });

//       window.google.accounts.id.renderButton(
//         document.getElementById('google-signin-button')!,
//         { theme: 'outline', size: 'large' }
//       );
//     };

//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.onload = initializeGoogle;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   };

//   const handleLogout = () => {
//     Cookies.remove('google_logged_in');
//     Cookies.remove('google_user_info');
//     setIsLoggedIn(false);
//     setUserInfo(null);
//   };

//   const handleGetUserEmail = () => {
//     if (userInfo) {
//       alert(`Your email is: ${userInfo.email}`);
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
//           <img src={userInfo.picture} alt="Profile" width={100} height={100} />
//           <button onClick={handleLogout}>Log out</button>
//           <button onClick={handleGetUserEmail}>Get Email</button>
//         </div>
//       ) : (
//         <div id="google-signin-button"></div>
//       )}
//     </div>
//   );
// };

// export default GoogleLogin;


// "use client"; // This line allows the component to use client-side features

// import { useEffect } from 'react';
// import Cookies from 'js-cookie';

// declare global {
//   interface Window {
//     google: any; // Declare the google object to avoid TypeScript errors
//   }
// }

// const GoogleLogin = () => {
//   useEffect(() => {
//     const handleCredentialResponse = (response: any) => {
//       const { credential } = response;
//       const user = JSON.parse(atob(credential.split('.')[1]));
//       console.log('User:', user);

//       // Set user information in cookies
//       Cookies.set('user_info', JSON.stringify(user), { expires: 7 });

//       window.location.href = '/profile'; // Redirect to profile page
//     };

//     const initializeGoogle = () => {
//       window.google.accounts.id.initialize({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
//         callback: handleCredentialResponse,
//       });

//       window.google.accounts.id.renderButton(
//         document.getElementById('google-signin-button')!,
//         { theme: 'outline', size: 'large' } // customization options
//       );
//     };

//     // Load Google Identity Services
//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.onload = initializeGoogle;
//     document.body.appendChild(script);
//   }, []);

//   return <div id="google-signin-button"></div>;
// };

// export default GoogleLogin;



