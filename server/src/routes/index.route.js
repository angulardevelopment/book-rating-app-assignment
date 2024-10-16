import { Router } from "express";
import authRoute from './auth.route.js';
import dotenv from 'dotenv';
import booksRoute from './books.route.js'
dotenv.config();

const router = Router();

router.use('/books', booksRoute)
router.use('/users', authRoute)
export default router