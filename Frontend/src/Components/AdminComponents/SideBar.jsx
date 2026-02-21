import { ShieldUser } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

function SideBar({ sideBarOpen, setSideBarOpen }) {

  const location = useLocation();
  console.log("Location: ", location?.pathname)

  return (
    <div className="">
      <div className='border-r w-64 h-full py-4 md:block hidden'>
        <Link to="/admin/dashboard"><h1 className='flex items-center justify-center font-bold text-xl'> <ShieldUser size={30} /> Admin Dashboard</h1></Link>
        <div className="flex flex-col w-full px-4 gap-2">
          <Link to="/admin/dashboard" className={`p-3 font-bold hover:bg-gray-400 rounded-lg ${location.pathname === "/admin/dashboard" ? "bg-gray-400" : ""}`}>Dashboard</Link>
          <Link to="/admin/products" className={`p-3 font-bold hover:bg-gray-400 rounded-lg ${location.pathname === "/admin/products" ? "bg-gray-400" : ""}`}>Products</Link>
          <Link to="/admin/orders" className={`p-3 font-bold hover:bg-gray-400 rounded-lg ${location.pathname === "/admin/orders" ? "bg-gray-400" : ""}`}>Orders</Link>
        </div>
      </div>

      <Sheet open={sideBarOpen} onOpenChange={setSideBarOpen} >
        <SheetContent side="left" className="w-70">
          <SheetHeader>
            <SheetTitle>
              <Link to="/admin/dashboard"><h1 className='flex items-center justify-center font-bold text-xl'> <ShieldUser size={30} /> Admin Dashboard</h1></Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col w-full px-4 gap-2">
            <Link to="/admin/dashboard" className={`p-3 font-bold hover:bg-gray-400 rounded-lg ${location.pathname === "/admin/dashboard" ? "bg-gray-400" : ""}`} onClick={() => setSideBarOpen(false)}>Dashboard</Link>
            <Link to="/admin/products" className={`p-3 font-bold hover:bg-gray-400 rounded-lg ${location.pathname === "/admin/products" ? "bg-gray-400" : ""}`} onClick={() => setSideBarOpen(false)}>Products</Link>
            <Link to="/admin/orders" className={`p-3 font-bold hover:bg-gray-400 rounded-lg ${location.pathname === "/admin/orders" ? "bg-gray-400" : ""}`} onClick={() => setSideBarOpen(false)}>Orders</Link>
          </div>
        </SheetContent>
      </Sheet>

    </div>
  )
}

export default SideBar
