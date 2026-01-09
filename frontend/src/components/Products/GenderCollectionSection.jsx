import React from 'react'
import manCollectionImg from "../../assets/manCollectionImg.jpg";
import womanCollectionImg from "../../assets/womanCollectionImg.jpg"
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <div className='flex  md:flex-row flex-col'>
        <div className='relative m-5 bg-gray-100 p-5'>
            <img src={manCollectionImg} alt="" className='w-full'/>
            <div className='  p-3 text-center absolute bottom-11 left-9 bg-white/70 py-2 '>
                <h3 className='text-xs md:text-lg font-bold'>Men's collection</h3>
                <Link to="#" href="#" className='tex-black  text-xs md:text-sm  underline '>shop</Link>
            </div>
        </div>
        <div className='relative m-5 bg-gray-100 p-5'>
            <img src={womanCollectionImg} alt="" className='w-full object-cover h-full'/>
            <div className=' p-3 text-center absolute bottom-11 left-9 bg-white/70  '>
                <h3 className='text-xs md:text-lg font-bold'>Women's collection</h3>
                <Link to="#" href="#" className='tex-black  text-xs md:text-sm underline '>shop</Link>
            </div>
        </div>
    </div>
  )
}

export default GenderCollectionSection