import express from 'express'
import { loginUser, registerUser, adminLogin, getUserData, getAllUsers } from '../controllers/userController.js'
import authUser from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/getUserData', authUser, getUserData)
userRouter.get('/all', adminAuth, getAllUsers) // Get all users for admin panel

export default userRouter;