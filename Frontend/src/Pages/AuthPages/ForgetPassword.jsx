import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { UpdatePasswordThunk } from '@/StateManagment/AuthState'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

function ForgetPassword() {

  const params = useParams();
  const [data, setData] = useState({
    UserEmail: params.email,
    NewPassword: "",
    ConfirmPassword: ""
  })

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function HandleForgetPassword(){
    dispatch(UpdatePasswordThunk(data)).then((e) => {
      if(e?.payload?.success){
        toast.success(`${e?.payload?.message}`)
        navigate("/auth/login")
      }else{
        toast.error(`${e?.payload?.message}`)
      }
    })
  }

  return (
    <div className='space-y-3 w-[80%]'>
      <Label>New Password</Label>
      <Input type="text" placeholder="Enter your new password!"
      onChange={(e) => setData({
        ...data,
        "NewPassword" : e.target.value
      })}
      />
      <Label>Confirm Password</Label>
      <Input type="password" placeholder="Enter your confirm password!"
      onChange={(e) => setData({
        ...data,
        "ConfirmPassword" : e.target.value
      })}
      />
      <Button onClick={() => HandleForgetPassword()}>Update</Button>
    </div>
  )
}

export default ForgetPassword
