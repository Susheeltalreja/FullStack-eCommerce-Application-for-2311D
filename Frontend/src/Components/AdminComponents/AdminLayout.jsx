import React, { useState } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function AdminLayout() {

  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <div className='w-screen h-screen flex'>
      <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen}/>
      <div className="w-full h-full">
        <Header setSideBarOpen={setSideBarOpen}/>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
