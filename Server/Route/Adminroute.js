const express = require("express")
const router = express.Router()
const AdminverifyToken = require("../Middleware/Admintokenverify")
const admincontroller = require("../Controller/Admincontroller")
router.post("/Login",admincontroller.adminLogin)
module.exports = router