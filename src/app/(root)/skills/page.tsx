"use client"
import React from 'react'
import ResponsiveNav from '../../components/Navigation/ResponsiveNav'
import ModalContactHomePage from '../../components/Modals/ModalContactHomePage'
import ModalRegisterHomePage from '../../components/Modals/ModalRegisterHomePage'
import Footer from '../../components/Footer/page'

import VideoList from '../../components/VideoList/VideoList'
import ChartCircle from '@/app/components/Chart/ChartCircle'
import DragDrop from '@/app/components/DragandDrop/DragDropList'

const SkillsPage= () => {
  return (
    <div>
       <ResponsiveNav />
      <ChartCircle/>
      <DragDrop />
       <VideoList/>
       <Footer/>

       <ModalContactHomePage  />
       <ModalRegisterHomePage />

    </div>
  )
}

export default SkillsPage