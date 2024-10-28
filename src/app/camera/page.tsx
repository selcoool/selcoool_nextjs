import CameraDetection from '@/app/components_dashboard/CameraDetection'
import { div } from '@tensorflow/tfjs'
import React from 'react'

const CameraPage = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
         <CameraDetection />
    </div>

  )
}

export default CameraPage