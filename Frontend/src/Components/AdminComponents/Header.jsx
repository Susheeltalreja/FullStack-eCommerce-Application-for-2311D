import React from 'react'
import { Button } from '../ui/button'
import { Hamburger, LogOut, MenuIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { UserLoggedOutThunk } from '@/StateManagment/AuthState';
import { toast } from 'sonner';

function Header({ setSideBarOpen }) {

  const dispatch = useDispatch();

  function HandleLogout() {
    dispatch(UserLoggedOutThunk()).then((e) => {
      if (e?.payload?.success) {
        toast.success(`${e?.payload?.message}`);
      } else {
        toast.error(`${e?.payload?.message}`);
      }
    })
  }

  return (
    <div className='border-b h-16 flex justify-between items-center px-4 relative'>
      <div className="">
        <div className="uppercase italic font-bold">
          Dashboard
        </div>
        <Button className="md:hidden flex cursor-pointer" onClick={() => setSideBarOpen(true)}> <MenuIcon /></Button>
      </div>
      <div className="absolute right-4 flex justify-center items-center gap-3 ">
        <div className="text-center">
          <h1>Susheel</h1>
          <h2>Susheel@email.com</h2>
        </div>
        <span>|</span>
        <Button className="cursor-pointer" variant='outline' onClick={() => HandleLogout()}> <LogOut /> Logout</Button>
      </div>
    </div>
  )
}

export default Header
