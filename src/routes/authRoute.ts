import { Router } from "express";

import { AuthController } from "../controllers";
import { validateLogin, validateRegister } from "../validators";

const router = Router();

// /auth/login
router.post("/login", validateLogin(), AuthController.login);

// /auth/register
router.post("/register", validateRegister(), AuthController.register);

export { router as authRoute };
