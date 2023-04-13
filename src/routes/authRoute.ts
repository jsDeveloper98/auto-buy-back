import { Router } from "express";
import { check } from "express-validator";

import { AuthController } from "../controllers";
import { getFieldValidationMessage } from "../utils";
import { INPUT_TYPE_MIN_LENGTH, INPUT_TYPE_MAX_LENGTH } from "../constants";

const router = Router();

// /auth/register
router.post(
  "/register",
  [
    check("email", getFieldValidationMessage("Email", "invalid"))
      .normalizeEmail()
      .isEmail(),
    check("password", getFieldValidationMessage("Password", "input")).isLength({
      min: INPUT_TYPE_MIN_LENGTH,
      max: INPUT_TYPE_MAX_LENGTH,
    }),
    check("username", getFieldValidationMessage("Username", "input")).isLength({
      min: INPUT_TYPE_MIN_LENGTH,
      max: INPUT_TYPE_MAX_LENGTH,
    }),
  ],
  AuthController.register
);

// /auth/login
router.post(
  "/login",
  [
    check(
      "password",
      getFieldValidationMessage("Password", "required")
    ).exists(),
    check("email", getFieldValidationMessage("Email", "invalid"))
      .normalizeEmail()
      .isEmail(),
  ],
  AuthController.login
);

export { router as authRoute };
