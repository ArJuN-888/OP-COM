const express = require("express")
const billController = require("../Controller/Billcontroller")
const router = express.Router()
const Middleware = require("../Middleware/Tokenverify")
router.post("/Billregistration",Middleware,billController.addBill)
router.get("/Billregistration/retrieve",Middleware,billController.getBill)
module.exports = router