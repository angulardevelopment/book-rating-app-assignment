import validate from "../middlewares/validate.middleware.js"; 
import { Router } from "express"; 
import { isAuth } from "../middlewares/authentication.middleware.js"; 

import { RegisterSchema, LoginSchema } from "../schemas/user.schema.js"; 

import { login, register } from "../controllers/auth.controller.js"; 

const router = Router();

router.post("/login", validate(LoginSchema), login);
router.post("/register", validate(RegisterSchema), register);

export default router;