"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Profile = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fbLoggedIn = Cookies.get('fb_logged_in') === 'true';
    const googleLoggedIn = Cookies.get('google_logged_in') === 'true';
    
    const loggedIn = fbLoggedIn || googleLoggedIn;
    setIsLoggedIn(loggedIn);
    
    if (!loggedIn) {
      router.push('/'); // Redirect to home if not logged in
    } else {
      const storedUserInfo = JSON.parse(Cookies.get('fb_user_info') || Cookies.get('google_user_info') || '{}');
      setUserInfo(storedUserInfo);
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const profilePicture = userInfo?.picture?.data?.url || userInfo?.picture; // Access the correct picture URL

  return (
    <div>
      {userInfo?.name ? (
        <div>
          <h1>Welcome, {userInfo.name}</h1>
          {profilePicture && <img src={profilePicture} alt="Profile" />}
          {/* Display additional user info */}
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default Profile;






// "use client"; // This line allows the component to use client-side features

// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';

// const Profile = () => {
//   // const [user, setUser] = useState<any>(null);

//   // useEffect(() => {
//   //   // Check for user data in cookies
//   //   const userData = Cookies.get('user_info');
//   //   if (userData) {
//   //     setUser(JSON.parse(userData));
//   //   } else {
//   //     window.location.href = '/'; // Redirect to home if not logged in
//   //   }
//   // }, []);

//   // if (!user) {
//   //   return <p>Loading...</p>;
//   // }

//   // console.log('user', user);

//   return (
//     <h1>sdsf</h1>
    // <div className="flex flex-col items-center mt-10">
    //   <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
    //   <p className="mt-2 text-lg">Email: {user.email}</p>

    //   {/* Avatar Image */}
    //   <div className="mt-4">
    //     <img 
    //       src={user.picture || 'https://lh3.googleusercontent.com/a/ACg8ocLF3icYWlIPkFeE4Fmq3hoJpyrICd0t0SyTP4r3Z53r5PzKg5Q=s96-c'} 
    //       alt="User Avatar" 
    //       className="w-24 h-24 rounded-full border-2 border-gray-300" 
    //     />
    //   </div>

    //   {/* Logout Button */}
    //   <button 
    //     className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" 
    //     onClick={() => {
    //       Cookies.remove('user_info'); // Remove user info from cookies
    //       window.location.href = '/'; // Redirect to home
    //     }}
    //   >
    //     Logout
    //   </button>
    // </div>
//   );
// };

// export default Profile;



