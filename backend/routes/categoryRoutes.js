const express = require("express");
const {
  createCategory,
  categories,
  category,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();
const { protect, adminGuard } = require("../middleware/authMiddleware");

// Routes relative to /api/categories
router.post("/", protect, adminGuard, createCategory);
router.get("/", protect, categories);
router.get("/:slug", protect, category);
router.patch("/:id", protect, adminGuard, updateCategory);
router.delete("/:id", protect, adminGuard, deleteCategory);

module.exports = router;
