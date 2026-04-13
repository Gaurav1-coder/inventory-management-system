const express = require("express");
const { getActivityLogs } = require("../controllers/activityLogController");
const { protect, adminGuard } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, adminGuard, getActivityLogs);

module.exports = router;
