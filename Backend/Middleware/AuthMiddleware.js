
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const AuthMiddleWare = async(req, res, next) => {
    const Token = req?.cookies.Token;
    try{
        if(!Token){
            return res.status(401).json({
                success: false,
                message: "No token provided"
            })
        }
        try{
            const DecodeToken = jwt.verify(Token, process.env.JWT_KEY);
            req.User = DecodeToken;
            next();
        }catch(e){
            console.log(`Error: ${e}`);
            return res.status(500).json({
                success: false,
                message: "Invalid token"
            })
        }

    }catch(e){
        console.log(`Error: ${e}`);
    }
}

module.exports = {AuthMiddleWare}