const express=require("express")
const router=express.Router()
const {Addproduct,getTopProductsByQuantity,RemoveProduct,SearchProduct,EditProduct,getProduct}=require('../controller/productController')
const {authmiddleware,adminmiddleware,managermiddleware}=require('../middleware/Authmiddleware')


router.post("/create",authmiddleware,adminmiddleware,Addproduct)
router.post("/addproduct",authmiddleware,adminmiddleware,Addproduct) // Backward compatibility
router.delete("/:productId",authmiddleware,adminmiddleware,RemoveProduct)
router.delete("/removeproduct/:productId",authmiddleware,adminmiddleware,RemoveProduct) // Backward compatibility
router.get("/all",authmiddleware,getProduct)
router.get("/getproduct",authmiddleware,getProduct) // Backward compatibility
router.get("/searchproduct",authmiddleware,SearchProduct)
router.put("/:productId",authmiddleware,adminmiddleware,EditProduct)
router.patch("/:productId",authmiddleware,adminmiddleware,EditProduct)
router.put("/editproduct/:productId",authmiddleware,adminmiddleware,EditProduct) // Backward compatibility
router.get("/getTopProductsByQuantity",authmiddleware,getTopProductsByQuantity)




module.exports=router