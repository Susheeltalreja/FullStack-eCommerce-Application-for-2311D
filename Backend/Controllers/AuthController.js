const AuthModel = require("../Models/AuthModel");
const transport = require("../Mail/index")
//Packages
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
//UserRegister

const UserRegister = async (req, res) => {
    const { UserName, UserEmail, UserPassword } = req.body;
    try {
        if (!UserName || !UserEmail || !UserPassword) {
            return res.json({
                success: false,
                message: "All input fields are required"
            })
        }
        const FindUser = await AuthModel.findOne({ UserEmail });
        if (FindUser) {
            return res.json({
                success: false,
                message: 'User already registered'
            })
        }
        const HashedPassword = await bcrypt.hash(UserPassword, 12);

        const CountDoc = await AuthModel.countDocuments();

        const DefineRole = CountDoc === 0 ? 'admin' : 'user';

        const GenerateOtp = Math.floor(1000 + Math.random() * 8999);

        const ExpireTime = new Date(Date.now() + (3 * 60 * 1000));

        const NewUser = AuthModel({
            UserName,
            UserEmail,
            UserPassword: HashedPassword,
            UserRole: DefineRole,
            UserOTP: GenerateOtp,
            OtpExpireTime: ExpireTime
        })
        await NewUser.save();

        transport.sendMail({
            from: process.env.SMTP_USER,
            to: UserEmail,
            subject: "OTP Verification",
            text: `OTP : ${GenerateOtp}`
        })

        return res.json({
            success: true,
            message: "User Register successfully"
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

//Login USER method
const LoginUser = async (req, res) => {
    const { Email, Password } = req.body;
    try {
        if (!Email || !Password) {
            return res.json({
                success: false,
                message: "All Input fields are required"
            })
        }
        const FindUser = await AuthModel.findOne({ UserEmail: Email });
        if (!FindUser) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        const MatchPassword = await bcrypt.compare(Password, FindUser.UserPassword);
        if (!MatchPassword) {
            return res.json({
                success: false,
                message: "Incorrect Password"
            })
        }

        if (FindUser.isVerified === "pending") {
            return res.status(403).json({
                success: false,
                message: "User is not verified"
            })
        }

        const token = jwt.sign(
            {
                Id: FindUser?._id,
                Name: FindUser?.UserName,
                Role: FindUser?.UserRole
            },
            process.env.JWT_KEY,
            { expiresIn: "2h" }
        )

        return res.status(200).cookie("Token", token).json({
            success: true,
            message: "Logged in successfully",
            data: {
                Id: FindUser?._id,
                Name: FindUser?.UserName,
                Role: FindUser?.UserRole
            }
        })

    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

// Logout User
const LogoutUser = async (req, res) => {
    res.clearCookie("Token");
    return res.status(200).json({
        success: true,
        message: "User logged out successfuly"
    })
}

// otp verification
const OtpVerify = async (req, res) => {
    const { UserEmail, OTP } = req.body;
    try {
        if (!UserEmail || !OTP) {
            return res.json({
                success: false,
                message: "Invalid data"
            })
        }
        const FindUser = await AuthModel.findOne({ UserEmail });
        if (!FindUser) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        if (FindUser.UserOTP != OTP) {
            return res.json({
                success: false,
                message: "Invalid OTP"
            })
        }
        if (FindUser.OtpExpireTime < Date.now()) {
            return res.json({
                success: false,
                message: "Otp is expired"
            })
        }
        FindUser.UserOTP = null;
        FindUser.OtpExpireTime = null;
        FindUser.isVerified = "verified";
        await FindUser.save();

        const Token = jwt.sign(
            {
                Id: FindUser?._id,
                Name: FindUser?.UserName,
                Role: FindUser?.UserRole
            },
            process.env.JWT_KEY,
            { expiresIn: "2h" }
        )

        return res.status(200).cookie("Token", Token).json({
            success: true,
            message: "OTP Verified successfully",
            data: {
                Id: FindUser?._id,
                Name: FindUser?.UserName,
                Role: FindUser?.UserRole
            }
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

const ResendOtp = async (req, res) => {
    try {
        const email = req.params.email;
        if (!email) {
            return res.json({
                success: false,
                message: "Invalid data"
            })
        }
        const FindUserWithEmail = await AuthModel.findOne({ UserEmail: email });
        if (!FindUserWithEmail) {
            return res.json({
                success: true,
                message: "User not found"
            })
        }

        const GenerateOtp = Math.floor(1000 + Math.random() * 8999);
        const ExpireTime = new Date(Date.now() + (3 * 60 * 1000));

        FindUserWithEmail.UserOTP = GenerateOtp;
        FindUserWithEmail.OtpExpireTime = ExpireTime;
        FindUserWithEmail.isVerified = "pending";
        await FindUserWithEmail.save();

        transport.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Resend OTP',
            text: `OTP: ${GenerateOtp}`
        })

        return res.status(200).json({
            success: true,
            message: "OTP Resend Successfully"
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

//Forget password
const CheckUser = async (req, res) => {
    try {
        const Email = req.params.email;
        if (!Email) {
            return res.json({
                success: false,
                message: "Email not provide"
            })
        }
        const FindUser = await AuthModel.findOne({ UserEmail: Email });
        if (!FindUser) {
            return res.json({
                successs: false,
                message: 'User not found'
            })
        }
        transport.sendMail({
            from: process.env.SMTP_USER,
            to: Email,
            subject: "Forget Password",
            text: `http://localhost:5173/auth/update-password/${Email}`
        })
        return res.status(200).json({
            success: true,
            message: "Forget password linked sended to your mail"
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

// Update Password
const UpdatePassword = async (req, res) => {
    const {UserEmail, NewPassword, ConfirmPassword} = req.body;
    try {
        if(!UserEmail || !NewPassword || !ConfirmPassword){
            return res.json({
                success: false,
                message: "All Input fields are required"
            })
        }
        const FindUser = await AuthModel.findOne({UserEmail});
        if(!FindUser){
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        if(NewPassword !== ConfirmPassword){
            return res.json({
                success: false,
                message: "Both password are should be same"
            })
        }

        const HashedPassword = await bcrypt.hash(NewPassword, 10);
        FindUser.UserPassword = HashedPassword;
        await FindUser.save();
        return res.status(200).json({
            success: true, 
            message: "Password Updated Successfully"
        })

    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}
module.exports = { UserRegister, LoginUser, LogoutUser, OtpVerify, ResendOtp, CheckUser, UpdatePassword }