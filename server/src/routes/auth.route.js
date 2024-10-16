import validate from "../middlewares/validate.middleware.js"; 
import { Router } from "express"; 
import { isAuth } from "../middlewares/authentication.middleware.js"; 

import { RegisterSchema, LoginSchema, UpdateSchema } from "../schemas/user.schema.js"; 

import { 
    deleteUser, 
    login, 
    register, 
    updateUser 
} from "../controllers/auth.controller.js"; 

const router = Router();

// public routes
router.post("/login", validate(LoginSchema), login);
router.post("/register", validate(RegisterSchema), register);

// Authenticated route
router.patch("/", validate(UpdateSchema), isAuth, updateUser)
router.delete("/:id", isAuth, deleteUser);


export default router;