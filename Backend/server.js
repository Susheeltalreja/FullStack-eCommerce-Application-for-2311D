// Packages importing
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
//Configure the env
dotenv.config()
//Mongo db connectivity
mongoose.connect(process.env.MONGOOSE_URL).then(() => console.log("Mongo db connected successfully")).catch((e) => console.log(`Error: ${e}`))

//Routes for auth
const AuthRoutes = require("./Routes/AuthRoutes");

//Product Routes
const ProductRoutes = require("./Routes/AdminRoutes/ProductRoute");
// Port
const PORT = process.env.PORT;
// redeclare the exprews
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/auth", AuthRoutes);
app.use("/product", ProductRoutes)

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));