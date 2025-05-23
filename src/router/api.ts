import express from "express"
import authControllers from "../controllers/auth.controllers";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();


router.post('/register', authControllers.Register)
router.post('/login', authControllers.Login)
router.get('/me', authMiddleware , authControllers.Me)
router.post('/activation', authControllers.Activation)

export default router