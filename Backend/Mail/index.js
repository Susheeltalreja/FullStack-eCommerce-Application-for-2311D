
const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_APP_PASSWORD
    }
})

module.exports = transport;