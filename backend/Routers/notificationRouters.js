const express = require("express");
const router = express.Router();
const {createNotification,getAllNotifications,getUnreadNotifications,markAsRead,deleteNotification}= require("../controller/notificationcontroller");
const {authmiddleware, adminmiddleware} = require("../middleware/Authmiddleware");

router.post("/", authmiddleware, adminmiddleware, createNotification); 
router.post("/createNotification", authmiddleware, adminmiddleware, createNotification); // Backward compatibility
router.get("/", authmiddleware, getAllNotifications); 
router.get("/allNotification", authmiddleware, getAllNotifications); // Backward compatibility
router.get("/unread", authmiddleware, getUnreadNotifications); 
router.get("/unreadNotification", authmiddleware, getUnreadNotifications); // Backward compatibility
router.put("/:id/read", authmiddleware, markAsRead); 
router.put("/:id/readNotification", authmiddleware, markAsRead); // Backward compatibility
router.delete("/:id", authmiddleware, adminmiddleware, deleteNotification); 
router.delete("/deleteNotification/:id/", authmiddleware, adminmiddleware, deleteNotification); // Backward compatibility

module.exports = router;
