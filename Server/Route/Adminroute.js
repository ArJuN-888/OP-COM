const express = require("express")
const router = express.Router()
const admincontroller = require("../Controller/Admincontroller")
router.post("/Login",admincontroller.adminLogin)
module.exports = router