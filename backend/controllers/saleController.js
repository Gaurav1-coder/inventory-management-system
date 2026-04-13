const Sale = require("../models/Sale");

const addSale = async (req, res) => {
  try {
    const sale = await Sale.create(req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate("product").sort({ createdAt: -1 });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { addSale, getSales };
