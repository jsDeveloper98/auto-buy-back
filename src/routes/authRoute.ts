import { Router } from "express";
import { check } from "express-validator";

import { AuthController } from "../controllers";

const router = Router();

// TODO: add repeat password field in order to help use to avoid make some mistake
// /auth/register
router.post(
  "/register",
  [
    check("email", "Wrong email").normalizeEmail().isEmail(),
    check("password", "Wrong password").isLength({ min: 6, max: 30 }),
    check("username", "Wrong username").isLength({ min: 6, max: 30 }),
  ],
  AuthController.register
);

// /auth/login
router.post(
  "/login",
  [
    check("password", "Enter password").exists(),
    check("email", "Enter valid email").normalizeEmail().isEmail(),
  ],
  AuthController.login
);

export { router as authRoute };
