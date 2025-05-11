import express from "express"
import authControllers from "../controllers/auth.controllers";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.get('/', (req, res)=> {
    res.status(200).json({
        massage: 'Server is running',
        data: null
    })
});

router.post('/register', authControllers.Register)
router.post('/login', authControllers.Login)
router.get('/me', authMiddleware , authControllers.Me)

export default router