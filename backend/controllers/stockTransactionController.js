const StockTransaction = require("../models/StockTransaction");

const addStockTransaction = async (req, res) => {
  try {
    const transaction = await StockTransaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getStockTransactions = async (req, res) => {
  try {
    const transactions = await StockTransaction.find().populate("product").sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { addStockTransaction, getStockTransactions };
