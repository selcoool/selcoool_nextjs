"use client"
import React, { useEffect, useState } from 'react'
import ResponsiveNav from '../../components/Navigation/ResponsiveNav'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../../components/Footer/page';
import ModalContactHomePage from '../../components/Modals/ModalContactHomePage';
import ModalRegisterHomePage from '../../components/Modals/ModalRegisterHomePage';
import Modal from '../../components/Modals/Modal';
import Hero from '../../components/Hero/Hero';
import TimeLine from '../../components/Timeline/TimeLine';
import ScrollMenu from '../../components/ScrollMenu/ScrollMenu';
import MapGoogle from '../../components/MapGoogle/MapGoogle';
import MenuProduct from '../../components/MenuProduct/MenuProduct';
import SearchProdct from '../../components/SearchProduct/SearchProdct';
import { sha256 } from 'js-sha256';

import * as fbq from '../../../lib/fbpixel';
import VideoList from '../../components/VideoList/VideoList';

import {http} from '../../../lib/config_service'









const HomePage = () => {
    // State to handle modal visibility
    // const [showContactHomePage, setShowContactHomePage] = useState(false);
    // const [showRegisterHomePage, setShowRegisterHomePage] = useState(false);
   
    

    // Facebook Pixel integration for route change tracking

    useEffect(() => {
      const handleRouteChange = () => {
          fbq.pageview();
      };
      handleRouteChange();
  }, []);


  
  const createSendingData = async ({ values, eventId }: { values: any; eventId: any })  => {

  return {
    event_name: "Minh Thanh sx 23",
    // event_id: eventId,  // Use eventId passed in the function
    event_time: Math.floor(Date.now() / 1000), // Get current Unix timestamp
    action_source: "website",
    event_source_url: typeof window !== "undefined" ? window.location.href : "", // Check if window is defined
    user_data: {
      fn: [sha256(values.firstName)],
      ln: [sha256(values.lasttName)], // Fixed lastName instead of firstName for both
      ct:[sha256("Tokyo")]
    },
    // custom_data: {
    //   currency: "USD",
    //   value: "142.52",
    //   "marital status": "single always available"
    // }
  };
}

const triggerFormCompleteRegistration = async () => {
   const values ={
    firstName: "minh thanh 2",
    lasttName: 'tran 2'
   }
  const eventId = 753951222; // Static event ID
  const sendData = await createSendingData({ values, eventId });

  // Send the event via Facebook Pixel
  // const additionalData = {};
  fbq.event("Minh Thanh sx 232", values, { eventID: eventId });
  // fbq.pageview()
  
  fetch(`https://graph.facebook.com/v20.0/980884502489134/events?access_token=EAAMrhaUGXVwBOzyNUGBjiMfUkaFDx7ZAk8jZBSvTpdYTCuPYZAYAo6Gw0WbqrKP5OZBFI1T2kFdxvevY7qnhsShDI2uXjSZCnAqHJEmo8cJGw1MP4jLb8gRZBeZBttO2W1QxRxg78BK1367VJZCXuCYq9b2PsenDbZAqKtfzlHSkpU57VFMXtzVcqTPrlCalYqLwg8QZDZD`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              "data": [
                  sendData
              ], "test_event_code": "TEST7154"
          })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));

      alert('Bạn đã bấm')
}





const handleLogin = async () => {
  try {
    // Attempt to sign in with the provided email and password
    const infor = {email:'trmthanhpro@gmail.com', pass_word:'159753'};

    http.post('/auth/signin',infor)
    .then(({ data }) => {
      console.log("Logged in successfully:", data);
    })
    .catch((error) => {
      console.error("Error creating booking:", error);
    });
  
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

  

    return (
        <div className='bg-slate-200'>

          <div className="flex justify-center items-center ">
          <div>
      <button onClick={handleLogin}>Sign In</button>
    </div>
            <div className='w-[50%] h-[10%] bg-purple-500 flex justify-center items-center'>
              <button onClick={triggerFormCompleteRegistration}>Nút bấm</button>
            </div>
          </div>
         <ResponsiveNav />
     <Hero/>
     <TimeLine/>
      <ScrollMenu />
     <MenuProduct/>
     <SearchProdct/>
     <VideoList/>
       <MapGoogle/>
      <Footer/>


             <ModalContactHomePage  />
         <ModalRegisterHomePage />
        <Modal/>
        </div>
    );
};

export default HomePage;
