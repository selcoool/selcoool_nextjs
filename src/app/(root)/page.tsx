import React from 'react'
import Home from './home/page'
import GoogleLogin from '../components_dashboard/GoogleLogin';
import FacebookLogin from '../components_dashboard/FacebookLogin';


console.log("Google Client ID:");
// console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
// console.log("Facebook Client ID:", process.env.FACEBOOK_CLIENT_ID);
const HomePage = () => {
  return (
    <div>
      <div className='flex items-center space-x-[1rem]'>
      <GoogleLogin /><FacebookLogin />
      </div>
        
    <Home/>
    </div>
  )
}

export default HomePage
