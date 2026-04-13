const Order = require("../models/Order");

const addOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product").sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { addOrder, getOrders, updateOrder, deleteOrder };
