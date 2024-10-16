import validate from "../middlewares/validate.middleware.js"; 
import { Router } from "express"; 
import { isAuth } from "../middlewares/authentication.middleware.js"; 

import { RegisterSchema, LoginSchema, UpdateSchema } from "../schemas/user.schema.js"; 

import { 
    deleteUser, 
    getAllAdmin, 
    getUser, 
    login, 
    logout, 
    refreshAccessToken, 
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
router.post('/logout', isAuth, logout)

// User routes
router.get("/all", getAllAdmin);
router.post('/refresh-token', refreshAccessToken)
router.get("/:id", isAuth, getUser);


export default router;