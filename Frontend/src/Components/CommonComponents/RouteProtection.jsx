import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function RouteProtection({isAuth, User, children}) {
    // console.log("Frontend Middleware")

    const location = useLocation();
    if(!isAuth && !(location.pathname.includes("/auth/login") || location.pathname.includes("/auth/register")
    || location.pathname.includes("/auth/otp") || location.pathname.includes("/auth/check") || location.pathname.includes("/auth/update-password/"))){
        return <Navigate to="/auth/login"/>
    }

    if(isAuth && (location.pathname.includes("/auth/login") || location.pathname.includes("/auth/register") || location.pathname.includes("/auth/otp"))){
        if(User.Role === "admin"){
            return <Navigate to="/admin/dashboard" />
        }
        return <Navigate to="/user/home" />
    }

    if(isAuth && User.Role === "user"){
        return <Navigate to="/auth/login"/>
    }

  return (
    <div>
     {children}
    </div>
  )
}

export default RouteProtection
