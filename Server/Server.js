const express = require("express")
const cors = require("cors")
const DB = require("./Config/Db")
const productRoute = require("./Route/Productroute")
const reportRoute = require("./Route/Reportroute")
const userRoute = require("./Route/Userroute")
const adminRoute = require("./Route/Adminroute")
const billRoute = require("./Route/Billroute")
const app = express()
const PORT  = 5000
app.use(express.json())


app.use(cors({
    origin: ["http://localhost:5173"], // Change this to your React app's URL
    credentials: true,
  }));
  app.use(express.static("./public"));
app.use("/User",userRoute)
app.use("/Product",productRoute)
app.use("/Admin",adminRoute)
app.use("/Report",reportRoute)
app.use("/Bill",billRoute)
app.listen(PORT,()=>{
    console.log("Server started at port",PORT)
})