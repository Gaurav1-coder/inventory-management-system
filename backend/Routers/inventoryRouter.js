const express = require("express");
const router = express.Router();
const {addOrUpdateInventory,getAllInventory,getInventoryByProduct,deleteInventory}= require("../controller/inventorycontroller");

router.post("/", addOrUpdateInventory); 
router.post("/inventory", addOrUpdateInventory); // Backward compatibility
router.get("/", getAllInventory); 
router.get("/inventory", getAllInventory); // Backward compatibility
router.get("/:productId", getInventoryByProduct); 
router.get("/inventory/:productId", getInventoryByProduct); // Backward compatibility
router.delete("/:productId", deleteInventory); 
router.delete("/inventory/:productId", deleteInventory); // Backward compatibility 

module.exports = router;
