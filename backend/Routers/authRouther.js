const express=require("express")
const router=express.Router()
const {signup,login,updateProfile,logout,staffuser,manageruser,adminuser,removeuser, getAllUsers, getProfile}=require('../controller/authcontroller')
const {authmiddleware,adminmiddleware,managermiddleware}=require('../middleware/Authmiddleware')






router.post("/register",signup)
router.post("/login",login)
router.delete("/:UserId",authmiddleware,adminmiddleware,removeuser)
router.get("/staffuser",authmiddleware,adminmiddleware,staffuser)
router.get("/manageruser",authmiddleware,adminmiddleware,manageruser)
router.get("/adminuser",authmiddleware,adminmiddleware,adminuser)
router.get("/all",authmiddleware,adminmiddleware,getAllUsers)
router.post("/logout",authmiddleware,logout)
router.get("/profile",authmiddleware,getProfile)
router.put("/profile",authmiddleware,updateProfile)
router.put("/updateProfile",authmiddleware,updateProfile) // Backward compatibility









module.exports=router