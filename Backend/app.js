const dotenv=require("dotenv")
dotenv.config()
const express=require("express");
const app= express();
const cookieParser=require("cookie-parser");
const cors=require("cors");
const connectDb=require('./db/db');
const userRoute=require('./routes/user.route');
const captainRoute=require('./routes/captain.route');
const mapsRoute=require('./routes/maps.routes')

connectDb();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRoute)
app.use('/captains',captainRoute)
app.use('/maps',mapsRoute)


module.exports=app;