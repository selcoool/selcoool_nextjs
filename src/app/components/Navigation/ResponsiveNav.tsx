"use client"
import React, { useState } from 'react'
import MobileNav from './MobileNav'
import Nav from './Nav'

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState<boolean>(false);

  return (
    <div>
     
      <Nav  showNav={showNav} setShowNav={setShowNav} />
      <MobileNav  showNav={showNav} setShowNav={setShowNav}/>
    </div>
  )
}

export default ResponsiveNav