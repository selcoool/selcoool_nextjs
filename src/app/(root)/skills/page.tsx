"use client"
import React from 'react'
import ResponsiveNav from '../../components/Navigation/ResponsiveNav'
import ModalContactHomePage from '../../components/Modals/ModalContactHomePage'
import ModalRegisterHomePage from '../../components/Modals/ModalRegisterHomePage'
import Footer from '../../components/Footer/page'
import Expertise from '../../components/Expertise/Expertise'
import VideoList from '../../components/VideoList/VideoList'

const SkillsPage= () => {
  return (
    <div>
       <ResponsiveNav />
       <Expertise/>
       <VideoList/>
       <Footer/>

       <ModalContactHomePage  />
       <ModalRegisterHomePage />

    </div>
  )
}

export default SkillsPage