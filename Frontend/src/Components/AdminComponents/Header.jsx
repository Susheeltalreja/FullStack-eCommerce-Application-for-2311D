import React from 'react'
import { Button } from '../ui/button'
import { Hamburger, LogOut, MenuIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { UserLoggedOutThunk } from '@/StateManagment/AuthState';
import { toast } from 'sonner';

function Header({setSideBarOpen}) {

  const dispatch = useDispatch();

  function HandleLogout(){
    dispatch(UserLoggedOutThunk()).then((e) => {
      if(e?.payload?.success){
        toast.success(`${e?.payload?.message}`);
      }else{
        toast.error(`${e?.payload?.message}`);
      }
    })
  }

  return (
    <div className='border-b h-16 flex justify-between items-center px-4 relative'>
      <Button className="md:hidden flex cursor-pointer" onClick={() => setSideBarOpen(true)}> <MenuIcon /></Button>
      <Button className="absolute right-4 cursor-pointer" onClick={() => HandleLogout()}> <LogOut /> Logout</Button>
    </div>
  )
}

export default Header
