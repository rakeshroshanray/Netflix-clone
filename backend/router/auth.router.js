import express from 'express';
import {login, signup, logout} from '../controllers/auth.controllers.js'

const router = express.Router();

router.post('/signup',signup)

router.get('/login',login)

router.post('/logout',logout)

export default router;