const express=require("express")
const router=express.Router()
const {createCategory,RemoveCategory,getCategory,updateCategory,Searchcategory}=require('../controller/categorycontroller')
const {authmiddleware,adminmiddleware,managermiddleware}=require('../middleware/Authmiddleware')



router.post("/",authmiddleware,adminmiddleware,createCategory)
router.post("/createcategory",authmiddleware,adminmiddleware,createCategory) // Backward compatibility
router.get("/",getCategory)
router.get("/getcategory",getCategory) // Backward compatibility
router.get("/searchcategory",authmiddleware,Searchcategory)


router.delete("/:CategoryId",authmiddleware,adminmiddleware,RemoveCategory)
router.delete("/removecategory/:CategoryId",authmiddleware,adminmiddleware,RemoveCategory) // Backward compatibility
router.put("/",authmiddleware,adminmiddleware,updateCategory)
router.put("/updateCategory",authmiddleware,adminmiddleware,updateCategory) // Backward compatibility







module.exports=router