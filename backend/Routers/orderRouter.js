const express = require("express");
const router = express.Router();
const {
  createOrder,
  searchOrder,
  updatestatusOrder,
  getOrder,
  getOrderStatistics,
  Removeorder,
} = require("../controller/orderController");
const {
  authmiddleware,
  adminmiddleware,
  managermiddleware,
} = require("../middleware/Authmiddleware");

router.post("/",authmiddleware, createOrder);
router.post("/createorder",authmiddleware, createOrder); // Backward compatibility
router.get("/", authmiddleware, getOrder);
router.get("/getorders", authmiddleware, getOrder); // Backward compatibility
router.delete("/:OrderId", authmiddleware, Removeorder);
router.delete("/removeorder/:OrdertId", authmiddleware, Removeorder); // Backward compatibility
router.put("/status/:OrderId", authmiddleware,updatestatusOrder);
router.put("/updatestatusOrder/:OrderId", authmiddleware,updatestatusOrder); // Backward compatibility
router.get("/Searchdata", authmiddleware, searchOrder);
router.get("/graphstatusorder",authmiddleware, getOrderStatistics);


module.exports = router;
