const express = require("express");
const { addSupplier, getSuppliers, deleteSupplier } = require("../controllers/supplierController");
const { protect, adminGuard } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, adminGuard, addSupplier);
router.get("/", protect, getSuppliers);
router.delete("/:id", protect, adminGuard, deleteSupplier);

module.exports = router;
