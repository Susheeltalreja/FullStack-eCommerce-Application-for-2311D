import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import React, { useState } from 'react'
import { LoginForm } from '@/config'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { UserLoginThunk } from '@/StateManagment/AuthState'
import { toast } from 'sonner'

function Login() {

  const [formData, setFormData] = useState({
    Email: "",
    Password: ""
  })

  const dispatch = useDispatch();

  function HandleLogin(){
    dispatch(UserLoginThunk(formData)).then((d) => {
      if(d?.payload?.success){
        toast.success(`${d?.payload?.message}`);
      }else{
        toast.error(`${d?.payload?.message}`);
      }
    });
  }

  return (
    <div className='w-full px-4 flex justify-center items-center flex-col gap-3'>
      <h1 className='text-3xl font-bold'>Login Form</h1>
      <div className="space-y-3 w-[80%]">
        {
          LoginForm.map((e) => (
            <div className="" key={e.name}>
              <Label>{e.label}</Label>
              <Input type={e.type} placeholder={e.placeholder} onChange={(event) => setFormData({
                ...formData,
                [e.name] : event.target.value
              })}/>
            </div>
          ))
        }
        <div className="flex w-full justify-between">
        <p>Not have an account? <Link to="/auth/register" className='font-bold hover:underline'>Register</Link></p>
        <Link to="/auth/check">Forget Password?</Link>
        </div>
        <Button className="cursor-pointer" onClick={() => HandleLogin()}>Login</Button>
      </div>
    </div>
  )
}

export default Login
