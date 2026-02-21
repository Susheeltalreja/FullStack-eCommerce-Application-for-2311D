import { Button } from '@/Components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/Components/ui/input-otp'
import { OtpVerifyThunk } from '@/StateManagment/AuthState';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function OtpForm() {

    const [otp, setOtp] = useState("");

    const location = useLocation();
    // console.log('Location: ',location.state);
    const dispatch = useDispatch();
    function HandleVerify(){
        let data = {
            UserEmail: location?.state,
            OTP: otp
        }
        dispatch(OtpVerifyThunk(data)).then((d) => {
            if(d?.payload?.success){
                toast.success(`${d?.payload?.message}`)
            }else{
                toast.error(`${d?.payload?.message}`)
            }
        })
    }

    async function handleResendOtp(){
        const response = await axios.get(`http://localhost:5000/auth/resend/${location?.state}`)
        if(response?.data?.success){
            toast.success(`${response?.data?.message}`)
        }else{
            toast.error(`${response?.data?.message}`)
        }
    }

    return (
        <div className='space-y-2'>
            <InputOTP maxLength={4}
            onChange={(value) => setOtp(value)}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-16 h-10"/>
                    <InputOTPSlot index={1} className="w-16 h-10"/>
                    <InputOTPSlot index={2} className="w-16 h-10"/>
                    <InputOTPSlot index={3} className="w-16 h-10"/>
                </InputOTPGroup>
            </InputOTP>
            <p className='text-blue-600 font-bold hover:underline cursor-pointer' onClick={() => handleResendOtp()}>Resend!</p>
            <Button onClick={() => HandleVerify()}>Verify</Button>
        </div>
    )
}

export default OtpForm
