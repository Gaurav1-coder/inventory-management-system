const express = require("express");
const router = express.Router();
const { addOrder, getOrders, updateOrder, deleteOrder } = require("../controllers/orderController");

router.post("/", addOrder);
router.get("/", getOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
