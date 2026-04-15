const Supplier = require("../models/Suppliermodel");


module.exports.createSupplier = async (req, res) => {
  try {
    const { name, contact, email, address, contactInfo, productsSupplied } = req.body;

    // Support both flat (frontend) and nested (potential future) structures
    const supplierName = name;
    const finalContactInfo = contactInfo || {
      phone: contact || "",
      email: email || "",
      address: address || ""
    };

    if (!supplierName || (!finalContactInfo.phone && !finalContactInfo.email)) {
      return res.status(400).json({ success: false, message: "Name and at least one contact method are required." });
    }

    const newSupplier = new Supplier({
      name: supplierName,
      contactInfo: finalContactInfo,
      productsSupplied: productsSupplied || [],
    });

    await newSupplier.save();

    res.status(201).json({ success: true, message: "Supplier created successfully", newSupplier });
  } catch (error) {
    console.error("Create Supplier Error:", error);
    res.status(500).json({ success: false, message: "Error creating supplier", error: error.message });
  }
};


module.exports.getAllSuppliers = async (req, res) => {
  try {
    const Suppliers = await Supplier.find().populate("productsSupplied");

    res.status(200).json(Suppliers);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching suppliers", error });
  }
};


module.exports.getSupplierById = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const supplier = await Supplier.findById(supplierId).populate("productsSupplied");

    if (!supplier) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }

    res.status(200).json({ success: true, supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching supplier", error });
  }
};





module.exports.editSupplier = async (req, res) => {
  const { supplierId } = req.params;
  const { name, contact, email, address, contactInfo, productsSupplied } = req.body;

  try {
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    supplier.name = name || supplier.name;
    
    if (contactInfo) {
      supplier.contactInfo = {
        phone: contactInfo.phone || supplier.contactInfo.phone,
        email: contactInfo.email || supplier.contactInfo.email,
        address: contactInfo.address || supplier.contactInfo.address,
      };
    } else {
      if (contact) supplier.contactInfo.phone = contact;
      if (email) supplier.contactInfo.email = email;
      if (address) supplier.contactInfo.address = address;
    }

    if (productsSupplied) {
      supplier.productsSupplied = Array.isArray(productsSupplied)
        ? productsSupplied
        : [productsSupplied];
    }

    const updatedSupplier = await supplier.save();

    res.status(200).json({
      message: "Supplier updated successfully",
      supplier: updatedSupplier,
    });
  } catch (error) {
    console.error("Edit Supplier Error:", error);
    res.status(500).json({ message: "Error updating supplier", error: error.message });
  }
};



module.exports.deleteSupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const supplier = await Supplier.findByIdAndDelete(supplierId);

    if (!supplier) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }

    res.status(200).json({ success: true, message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting supplier", error });
  }
};


module.exports.searchSupplier = async (req, res) => {
  try {
    const { query } = req.query;
    console.log("Received query:", query); 

    if (!query || query.trim() === "") {
      return res.status(400).json({ success: false, message: "Query parameter is required" });
    }

  
    const suppliers = await Supplier.find({
      name: { $regex: new RegExp(query, "i") }, 
    });

    return res.json({ success: true, suppliers });
  } catch (error) {
    console.error("Search Error:", error);
    return res.status(500).json({ success: false, message: "Error fetching supplier", error: error.message });
  }
};


