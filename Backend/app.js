const dotenv=require("dotenv")
dotenv.config()
const express=require("express");
const app= express();
const cors=require("cors");
const connectDb=require('./db/db');
const userRoute=require('./routes/user.route');

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRoute)


module.exports=app;