const express = require("express");
const router = express.Router();
const {createSupplier,searchSupplier,editSupplier,getAllSuppliers,deleteSupplier,getSupplierById} = require("../controller/suppliercontroller");

router.post("/", createSupplier); 
router.post("/createsupplier", createSupplier); // Backward compatibility
router.get("/", getAllSuppliers); 
router.get("/getallsupplier", getAllSuppliers); // Backward compatibility
router.get("/:supplierId",getSupplierById); 
router.get("/searchSupplier",searchSupplier)
router.put("/:supplierId", editSupplier); 
router.put("/updatesupplier/:supplierId", editSupplier); // Backward compatibility
router.delete("/:supplierId", deleteSupplier); 

module.exports = router;
