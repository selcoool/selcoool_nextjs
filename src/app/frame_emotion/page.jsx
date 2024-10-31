"use client"
import React, { useEffect } from 'react'
import {useInView} from "react-intersection-observer"

const FrameEmotionPage = () => {
    const {ref,InView}=useInView()
  useEffect(()=>{
    if(InView){
        alert('ssfdsf')
    }
  },[ref])


  return (
    <div>

<div ref={ref}>FrameEmotionPage</div>
    </div>
    
  )
}

export default FrameEmotionPage


