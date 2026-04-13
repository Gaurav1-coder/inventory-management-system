const Notification = require("../models/Notification");

const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json("Notification deleted successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { createNotification, getNotifications, deleteNotification };
