import React from 'react'
import MyOrdersPage from './MyOrdersPage'

const Profile = () => {
  return (
    <div className=' min-h-screen flex flex-col'>
        <div className='flex-grow container mx-auto p-4 md:pd-6'>
            <div className='flex flex-col md:flex-row md:space-x-6  md:space-y-0'>
                {/* left sec */}
                <div className='w-full md:w-1/3 lg:w-1/4 h-[300px] shadow-md rounded-lg p-6'>
                    <h2 className='mb-3 text-2xl font-bold'>Admin User</h2>
                    <p className='mb-3 text-sm text-gray-600 '>Email@test.com</p>
                    <button className='bg-red-500 py-2 px-4 hover:bg-red-600 rounded-sm w-full text-white  text-sm '>Logout</button>
                </div>
                {/* right sec */}
                <div className='w-full md:w-2/3 lg:w-3/4'>
                    <MyOrdersPage />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile