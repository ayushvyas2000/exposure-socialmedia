const express=require('express')
const router=express.Router()
const {getMe,loginUser,registerUser, updateUser}=require('../controllers/user')
const {protect}=require('../middleware/authMiddleware')
router.post('/',registerUser)
router.post('/login',loginUser)
router.post('/me',protect,getMe)
router.patch('/update',protect,updateUser)
module.exports=router