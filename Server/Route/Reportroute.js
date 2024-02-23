const express = require("express")
const reportController = require("../Controller/Reportcontroller")
const router = express.Router()
const Middleware = require("../Middleware/Tokenverify")
const AdminverifyToken = require("../Middleware/Admintokenverify")
router.post("/reports",Middleware,reportController.addreport)
router.get("/reports/fetch",AdminverifyToken,reportController.getreport)
router.delete("/reports/delete/:repoID",AdminverifyToken,reportController.deleterepo)
module.exports = router

