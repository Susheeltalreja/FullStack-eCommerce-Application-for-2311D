import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import React, { useState } from 'react'
import { RegisterForm } from '@/config'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { UserRegister } from '@/StateManagment/AuthState'
import { toast } from 'sonner'

function Register() {

  const [formData, setFormData] = useState({
    UserName: "",
    UserEmail: "",
    UserPassword: ""
  })
  const dispatch = useDispatch();

  console.log("Form: ", formData)

  const navigate = useNavigate();

  function HandleRegister(){
    dispatch(UserRegister(formData)).then((result) => {
      if(result?.payload?.success){
        navigate("/auth/otp", {state: formData.UserEmail})
        toast.success(`${result?.payload?.message}`);
      }else{
        toast.error(`${result?.payload?.message}`);
      }
    })
  }

  return (
    <div className='w-full px-4 flex justify-center items-center flex-col gap-3'>
      <h1 className='text-3xl font-bold'>Register Form</h1>
      <div className="space-y-3 w-[80%]">
        {
          RegisterForm.map((e) => (
            <div className="" key={e.name}>
              <Label>{e.label}</Label>
              <Input type={e.type} placeholder={e.placeholder} onChange={(event) => setFormData({
                ...formData,
                [e.name] : event.target.value
              })}/>
            </div>
          ))
        }
         <p>Already have an account? <Link to="/auth/login" className='font-bold hover:underline'>Login</Link></p>
        <Button className="cursor-pointer" onClick={() => HandleRegister()}>Register</Button>
      </div>
    </div>
  )
}

export default Register
