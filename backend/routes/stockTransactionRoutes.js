const express = require("express");
const { addStockTransaction, getStockTransactions } = require("../controllers/stockTransactionController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, addStockTransaction);
router.get("/", protect, getStockTransactions);

module.exports = router;
