import React from 'react'
import { CiFacebook } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import { CiTwitter } from "react-icons/ci";


const TopBar = () => {
  return (
    <div className='bg-green-600 text-white'>
        <div className='container mx-auto flex items-center justify-between px-5 py-3'>
            <div className='  md:flex  hidden space-x-3  items-center'>
                <a href="" className='hover:text-fuchsia-400'>
                    <CiFacebook  className=" h-5 w-5" />
                </a>
                <a href="" className='hover:text-fuchsia-400'>
                    <IoLogoInstagram  className=" h-5 w-5" />
                </a>
                <a href="" className='hover:text-fuchsia-400'>
                    <CiTwitter  className=" h-5 w-5" />
                </a>
            </div>
            <div className='flex-grow text-center'>
                <p>we ship world wide</p>
            </div>
            <div className='md:block hidden'>
                <a  href="123" className='hover:text-gray-300'> +123456123 </a>
            </div>
        </div>
    </div>
  )
}

export default TopBar