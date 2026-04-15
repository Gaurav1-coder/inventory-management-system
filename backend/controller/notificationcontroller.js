const Notification = require("../models/Notificationmodel");

module.exports.createNotification = async (req, res) => {
  try {
    // 🚨 BACKEND FINAL FORCE FIX 🚨
    const { name, message, type, userId } = req.body;
    
    console.log("--- BACKEND: FINAL REQUEST RECEIVED ---");
    console.log("BODY:", JSON.stringify(req.body, null, 2));

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: "Message content is required!" });
    }

    const notification = new Notification({ 
      title: (name || "System Notification").trim(), 
      message: message.trim(), 
      type: type || "info", 
      user: userId || null 
    });
    
    const savedNotif = await notification.save();
    console.log("--- BACKEND: SAVED SUCCESS ---", savedNotif._id);

    const io = req.app.get("io");
    if (io) {
      if (userId) {
        io.to(userId.toString()).emit("newNotification", savedNotif);
      } else {
        io.emit("newNotification", savedNotif);
      }
    }

    res.status(201).json({ success: true, message: "Notification created successfully.", notification: savedNotif });
  } catch (error) {
    console.error("--- BACKEND: FATAL ERROR ---", error);
    res.status(500).json({ success: false, message: "Server error during notification creation.", error: error.message });
  }
};


module.exports.getAllNotifications = async (req, res) => {
  try {
    const user = req.user;
    let query = {};
    
    // If user is not admin, only show broadcast notifications and those specifically for them
    if (user.role !== "admin") {
      query = {
        $or: [
          { user: { $exists: false } },
          { user: null },
          { user: user._id }
        ]
      };
    }
    // If admin, show all notifications (history)
    
    const notifications = await Notification.find(query)
      .populate("user", "name role") 
      .sort({ createdAt: -1 })
      .limit(50);
      
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications.", error: error.message });
  }
};


module.exports.getUnreadNotifications = async (req, res) => {
  try {
    const user = req.user;
    const query = {
      read: false,
      $or: [
        { user: { $exists: false } },
        { user: null },
        { user: user._id }
      ]
    };
    
    const unreadNotifications = await Notification.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, unreadNotifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching unread notifications.", error: error.message });
  }
};


module.exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found." });
    }

    res.status(200).json({ success: true, message: "Notification marked as read.", notification });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating notification.", error });
  }
};


module.exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found." });
    }

    res.status(200).json({ success: true, message: "Notification deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting notification.", error });
  }
};
