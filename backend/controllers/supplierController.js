const Supplier = require("../models/Supplier");

const addSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(200).json("Supplier deleted successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { addSupplier, getSuppliers, deleteSupplier };
