const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth");
const {login,register,changePassword,deleteAccount}=require("../controllers/auth")

router.post("/login",login);
router.post("/register",register);
router.put("/changePassword",authMiddleware,changePassword);
router.delete("/deleteAccount",authMiddleware,deleteAccount);
module.exports=router;