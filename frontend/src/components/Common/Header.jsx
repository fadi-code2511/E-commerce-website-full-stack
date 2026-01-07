import React from 'react'
import TopBar from '../Layout/TopBar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div>
        {/* topBar */}
        <TopBar />
        {/* navBar */}
        <Navbar />
        {/* cartDrawer */}
    </div>
  )
}

export default Header