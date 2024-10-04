"use client"
import React, { useEffect } from 'react'
import ResponsiveNav from '../../components/Navigation/ResponsiveNav'
import ModalContactHomePage from '../../components/Modals/ModalContactHomePage'
import ModalRegisterHomePage from '../../components/Modals/ModalRegisterHomePage'
import Footer from '../../components/Footer/page'
import ScrollMenu from '../../components/ScrollMenu/ScrollMenu'
import MenuProduct from '../../components/MenuProduct/MenuProduct'
import VideoList from '../../components/VideoList/VideoList'

import Cookies from 'universal-cookie';
import { jwtDecode,JwtPayload } from 'jwt-decode'; // Correctly importing jwt-decode

const cookies = new Cookies();

const WorksPage = () => {


  useEffect(() => {
    // Retrieve the access_token from cookies
    const token = cookies.get('access_token');
    

    

    // If there's no token, redirect to login
    if (!token) {
      window.location.href = '/home';
      return;
    }

    try {
      // Decode the token and use the JwtPayload type for type safety
      const decodedToken = jwtDecode<JwtPayload>(token);

      if (decodedToken && decodedToken.exp) {
        const currentTime = Date.now() / 1000; // Current time in seconds

        // Check if the token is expired
        if (decodedToken.exp < currentTime) {
          console.warn('Access token has expired, redirecting to login...');
          window.location.href = '/home';
        
        }
      } else {
        // Handle case where the token has no exp property
        console.warn('Invalid token structure, redirecting to login...');
        window.location.href = '/home';
     
      }
    } catch (error:any) {
      console.error('Invalid access token, redirecting to login...');
      window.location.href = '/home';
     
    }
  }, []);


  return (
    <div>


      <ResponsiveNav />
      <MenuProduct/>
      <ScrollMenu />
      <VideoList/>
      <Footer/>

      <ModalContactHomePage  />
      <ModalRegisterHomePage />

    </div>
  )
}

export default WorksPage