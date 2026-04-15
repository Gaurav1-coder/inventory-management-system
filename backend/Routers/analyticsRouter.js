const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controller/analyticsController");
const { authmiddleware } = require("../middleware/Authmiddleware");

router.get("/dashboard-stats", authmiddleware, getDashboardStats);


module.exports = router;
