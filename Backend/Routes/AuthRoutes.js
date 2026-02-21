
const express = require('express');

const {UserRegister, LoginUser, LogoutUser, OtpVerify, ResendOtp, CheckUser, UpdatePassword} = require("../Controllers/AuthController");

const {AuthMiddleWare} = require("../Middleware/AuthMiddleware");

const route = express.Router();

route.post("/register", UserRegister);
route.post("/login", LoginUser);
route.post("/logout", LogoutUser);
route.post("/otp", OtpVerify)
route.get("/resend/:email", ResendOtp)
route.get("/check/:email", CheckUser)
route.post("/update-password", UpdatePassword)

route.get("/return", AuthMiddleWare, (req, res) => {
    const UserData = req.User;
    return res.json({
        success: true,
        data: UserData
    })
})

module.exports = route;