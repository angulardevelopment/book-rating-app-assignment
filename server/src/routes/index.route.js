import { Router } from "express";
import authRoute from './auth.route.js';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.use('/users', authRoute)

export default router