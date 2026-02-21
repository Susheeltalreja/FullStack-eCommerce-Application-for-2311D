import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
      <div className="bg-black md:flex hidden justify-center items-center flex-col relative">
        <div className="">
          <h1 className='text-4xl text-orange-400 font-bold hover:scale-110 cursor-pointer transition'>eCommerce</h1>
        </div>
        <div className="uppercase absolute bottom-10 text-gray-400">
          <h1>EST . 2026 PREMIUM QUALITY</h1>
        </div>
      </div>
      <div className=" flex justify-center items-center relative w-full">
        <div className="md:w-[90%] w-full">
          <Outlet />
        </div>
        <div className="absolute bottom-10 text-gray-600">
          &copy; eCommerce Inc. All rights reserved
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
