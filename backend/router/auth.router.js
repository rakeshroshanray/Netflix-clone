import express from 'express';
import { authCheck, login, signup, logout, forgotPassword, resetPassword } from '../controllers/auth.controllers.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

router.get("/authCheck", protectRoute, authCheck);

export default router;