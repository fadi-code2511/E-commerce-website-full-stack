import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import CartContents from '../Cart/CartContents';


const CartDrawer = ({toggleCartDrawer,drawOpen}) => {
    
  return (
    <div className={`w-3/4 sm:w-1/2 md:w-[30rem] bg-white/95 z-50 fixed h-full top-0 right-0 flex  flex-col transition delay-100 ${drawOpen? "taranlate-x-0" : "translate-x-full"}  `}>
        {/* close cart drawer button */}
        <div className='p-4'>
            <button onClick={toggleCartDrawer}>
                <IoMdClose className='h-6 w-6 text-gray-600 hover:text-gray-700' />
            </button>
        </div>
        {/* cart content with scrollable area */}
        <div className='ml-3 flex grow flex-col overflow-y-auto'>
          <span className=' text-xl font-semibold mb-2'>Your cart</span>
          {/* cart-content */}
          <CartContents />
        
        </div>
        <div className='flex  flex-col sticky  bottom-0 p-4  bg-gray-100 justify-center items-center border-t-2 '>
          <button className='text-white w-full bg-black hover:bg-gray-600 py-3 rounded-lg transition '>checkout</button>
          <p className='text-gray-400 text-sm mt-2'>Included Taxes</p>
        </div>
    </div>
  )
}

export default CartDrawer