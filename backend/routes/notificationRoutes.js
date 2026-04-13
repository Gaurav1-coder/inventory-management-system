const express = require("express");
const { createNotification, getNotifications, deleteNotification } = require("../controllers/notificationController");
const { protect, adminGuard } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, adminGuard, createNotification);
router.get("/", protect, getNotifications);
router.delete("/:id", protect, adminGuard, deleteNotification);

module.exports = router;
