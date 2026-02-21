import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'sonner';

function CheckUser() {
    const [Email, setEmail] = useState("");
    async function HandleReq(){
        const response = await axios.get(`http://localhost:5000/auth/check/${Email}`);
        if(response?.data?.success){
            toast.success(`${response?.data?.message}`)
        }else{
            toast.error(`${response?.data?.message}`)
        }
    }
  return (
    <div className="space-y-3">
        <Input type="Email" placeholder="Enter your email!" onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={() => HandleReq()}>Verify</Button>
    </div>
  )
}

export default CheckUser
