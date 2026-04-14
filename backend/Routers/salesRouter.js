const express = require("express");
const router = express.Router();
const {createSale,getAllSales,SearchSales,getSaleById,updateSale} = require("../controller/salescontroller");

router.get("/", getAllSales);
router.get("/getallsales", getAllSales); // Backward compatibility
router.post("/", createSale);
router.post("/createsales", createSale); // Backward compatibility
router.get("/searchdata", SearchSales); 
router.get("/:saleId", getSaleById);
router.put("/:saleId", updateSale);
router.put("/updatesales/:saleId",updateSale); // Backward compatibility 



module.exports = router;
