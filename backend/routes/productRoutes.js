const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");
const { protect } = require("../middleware/authMiddleware");
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Use the controller functions for cleaner code
router.post("/create", protect, addProduct);
router.get("/all", protect, getProducts);
router.get("/:id", protect, getProduct);
router.patch("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
