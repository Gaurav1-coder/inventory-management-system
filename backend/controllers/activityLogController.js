const ActivityLog = require("../models/ActivityLog");

const addActivityLog = async (req, res) => {
  
  try {
    const log = await ActivityLog.create(req.body);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find().populate("user").sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { addActivityLog, getActivityLogs };
