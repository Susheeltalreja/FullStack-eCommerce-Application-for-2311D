import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
//Admin Layout
import AdminLayout from './Components/AdminComponents/AdminLayout'
//Admin Pages
import Dashboard from './Pages/AdminPages/Dashboard'
import Orders from './Pages/AdminPages/Orders'
import Products from './Pages/AdminPages/Products'
import UserLayout from './Components/UserComponents/UserLayout'
import Home from './Pages/UserPages/Home'
import Accounts from './Pages/UserPages/Accounts'
import ProductsList from './Pages/UserPages/ProductsList'
import AuthLayout from './Components/AuthComponents/AuthLayout'
import Login from './Pages/AuthPages/Login'
import Register from './Pages/AuthPages/Register'
import RouteProtection from './Components/CommonComponents/RouteProtection'
import RenderRootPage from './Components/CommonComponents/RenderRootPage'
import { useDispatch, useSelector } from 'react-redux'
import { ReturnUserData } from './StateManagment/AuthState'
import OtpForm from './Pages/AuthPages/OtpForm'
import CheckUser from './Pages/AuthPages/CheckUser'
import ForgetPassword from './Pages/AuthPages/ForgetPassword'

function App() {

  // let isAuth = false;
  // let UserData = {
  //   Role: "admin"
  // }

  const {isAuth, UserData, AuthLoad} = useSelector(st => st.Auth);
  console.log("Auth ", isAuth);
  console.log("Useer: ", UserData);
  console.log("Load: ", AuthLoad);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ReturnUserData())
  }, [])

  if(!AuthLoad) return <p>Loading....</p>;

  return (
    <Routes>
      {/* // Admin pages  */}
      <Route path='/admin' element={<RouteProtection isAuth={isAuth} User={UserData}><AdminLayout /></RouteProtection>}>
        <Route path='dashboard' element={<Dashboard />}></Route>
        <Route path='orders' element={<Orders />}></Route>
        <Route path='products' element={<Products />}></Route>
      </Route>

      {/* Render root page  */}
      <Route path='/' element={<RenderRootPage />}></Route>

      {/* // User pages  */}
      <Route path='/user' element={<UserLayout />}>
        <Route path='home' element={<Home />}></Route>
        <Route path='account' element={<Accounts />}></Route>
        <Route path='list' element={<ProductsList />}></Route>
      </Route>

      {/* // Auth pages  */}
      <Route path="/auth" element={<RouteProtection isAuth={isAuth} User={UserData}><AuthLayout /></RouteProtection>}>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path='otp' element={<OtpForm />}></Route>
        <Route path='check' element={<CheckUser />}></Route>
        <Route path='update-password/:email' element={<ForgetPassword />}></Route>
      </Route>

    </Routes>
  )
}

export default App
