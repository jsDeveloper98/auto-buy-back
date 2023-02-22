import { Router } from "express";
import { check } from "express-validator";

import { AuthController } from "../controllers";

const authRoute = Router();

// /auth/register
authRoute.post("/register", [
  check("email", "Wrong email").normalizeEmail().isEmail(),
  check("password", "Wrong password").isLength({ min: 6 }),
  AuthController.register,
]);

// /auth/login
authRoute.post("/login", [
  check("email", "Enter valid email").normalizeEmail().isEmail(),
  check("password", "Enter password").exists(),
  AuthController.login,
]);

export { authRoute };
