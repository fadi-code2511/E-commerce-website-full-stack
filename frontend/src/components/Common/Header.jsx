import React from 'react'
import TopBar from '../Layout/TopBar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div  className=' border-b-2 border-gray-200'>
        {/* topBar */}
        <TopBar />
        {/* navBar */}
        <Navbar />
        {/* cartDrawer */}
    </div>
  )
}

export default Header