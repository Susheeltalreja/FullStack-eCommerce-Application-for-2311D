import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { Hamburger, LogOut } from 'lucide-react'
import { UserLoggedOutThunk } from '@/StateManagment/AuthState'
import { toast } from 'sonner'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'

function Navbar() {

  const { UserData } = useSelector(st => st.Auth)
  console.log('user', UserData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function HandleLogout() {
    dispatch(UserLoggedOutThunk()).then((e) => {
      if (e?.payload?.success) {
        navigate("/auth/login")
        toast.success(`${e?.payload?.message}`)
      } else {
        toast.error(`${e?.payload?.message}`)
      }
    })
  }

  const [openSidebar, setSideBarOpen] = useState(false)

  return (
    <div className="flex justify-center items-center">
      <div className='h-12 border-b flex justify-between items-center px-4 w-[80%] bg-white fixed top-5 z-40 rounded-[40px]'>
        <div className="">
          <Link to="/user/home" className='text-lg font-bold'>ShopEase</Link>
        </div>
        <div className="space-x-2 md:block hidden">
          <Link to="/user/list" className='font-bold'>Men</Link>
          <Link to="/user/list" className='font-bold'>Women</Link>
          <Link to="/user/list" className='font-bold'>Children</Link>
          <Link to="/user/list" className='font-bold'>Accessories</Link>
        </div>
        {
          UserData ? (
            <div className="gap-3 md:flex hidden">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-black text-white font-bold text-2xl">{UserData.Name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button className="cursor-pointer" onClick={() => HandleLogout()}>Logout <LogOut /></Button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/auth/login"><Button className="cursor-pointer bg-orange-400 hover:bg-orange-400">Sign In</Button></Link>
              <Link to="/auth/register"><Button className="cursor-pointer">Sign up</Button></Link>
            </div>
          )
        }
        <div className="block md:hidden">
          <Button onClick={() => setSideBarOpen(true)}><Hamburger /></Button>
        </div>

        <Sheet open={openSidebar} onOpenChange={setSideBarOpen}>
          <SheetContent side='right'>
            <SheetHeader>
              <SheetTitle><Link to="/user/home" className='text-lg font-bold' onClick={() => setSideBarOpen(false)}>ShopEase</Link></SheetTitle>
            </SheetHeader>
            <div className="px-4 space-y-3 h-screen">
              <div className="flex flex-col gap-4 h-[90%]">
                <Link to="/user/list" className='font-bold px-4 py-3 rounded-2xl hover:bg-gray-500'
                  onClick={() => setSideBarOpen(false)}
                >Men</Link>
                <Link to="/user/list" className='font-bold px-4 py-3 rounded-2xl hover:bg-gray-500'
                  onClick={() => setSideBarOpen(false)}
                >Women</Link>
                <Link to="/user/list" className='font-bold px-4 py-3 rounded-2xl hover:bg-gray-500'
                  onClick={() => setSideBarOpen(false)}
                >Children</Link>
                <Link to="/user/list" className='font-bold px-4 py-3 rounded-2xl hover:bg-gray-500'
                  onClick={() => setSideBarOpen(false)}
                >Accessories</Link>
              </div>
              {
                UserData ? (
                  <div className="gap-3">
                    <Button className="cursor-pointer w-full" onClick={() => HandleLogout()}>Logout <LogOut /></Button>
                  </div>
                ) : (
                  <div className="space-x-2">
                    <Link to="/auth/login"><Button className="cursor-pointer">Sign In</Button></Link>
                    <Link to="/auth/register"><Button className="cursor-pointer">Sign up</Button></Link>
                  </div>
                )
              }
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default Navbar
