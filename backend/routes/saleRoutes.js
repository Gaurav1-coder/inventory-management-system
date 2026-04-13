const express = require("express");
const { addSale, getSales } = require("../controllers/saleController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, addSale);
router.get("/", protect, getSales);

module.exports = router;
