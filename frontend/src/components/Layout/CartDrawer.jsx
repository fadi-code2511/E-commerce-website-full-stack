import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";


const CartDrawer = ({toggleCartDrawer,drawOpen}) => {
    
  return (
    <div className={`w-1/4 bg-red-100 fixed h-full top-0 right-0 flex flex-col transition delay-100 ${drawOpen? "taranlate-x-0" : "translate-x-full"}  `}>
        {/* close cart drawer button */}
        <div className='p-4'>
            <button onClick={toggleCartDrawer}>
                <IoMdClose className='h-6 w-6 text-gray-600 hover:text-gray-700' />
            </button>
        </div>
    </div>
  )
}

export default CartDrawer