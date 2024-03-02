import { Router } from "express";
import { checkUserDetails, loginUser, resetPassword } from "../Controllers/auth.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const auth_router = Router()

auth_router.post('/login', loginUser)
auth_router.get('/checkdetails',verifyToken, checkUserDetails)
auth_router.put('/resetPassword', resetPassword)

export default auth_router