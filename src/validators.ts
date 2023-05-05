import { ValidationChain, check } from "express-validator";

import { getFieldValidationMessage } from "./utils";
import {
  INPUT_TYPE_MAX_LENGTH,
  INPUT_TYPE_MIN_LENGTH,
  TEXTAREA_TYPE_MAX_LENGTH,
  TEXTAREA_TYPE_MIN_LENGTH,
} from "./constants";

export const validateAnnouncementCreation = (): ValidationChain[] => [
  check("price").optional().isNumeric(),
  check("make", getFieldValidationMessage("Make", "required")).exists(),
  check("model", getFieldValidationMessage("Model", "required")).exists(),
  check("year", getFieldValidationMessage("Year", "required"))
    .isNumeric()
    .exists(),
  check("title", getFieldValidationMessage("Title", "input")).isLength({
    min: INPUT_TYPE_MIN_LENGTH,
    max: INPUT_TYPE_MAX_LENGTH,
  }),
  check(
    "description",
    getFieldValidationMessage("Description", "textarea")
  ).isLength({
    min: TEXTAREA_TYPE_MIN_LENGTH,
    max: TEXTAREA_TYPE_MAX_LENGTH,
  }),
  check("files").custom((value, { req }) => {
    if (!req.files || req.files.length < 1) {
      throw new Error(getFieldValidationMessage("File", "required"));
    }

    return true;
  }),
];

export const validateRegister = (): ValidationChain[] => [
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
];

export const validateLogin = (): ValidationChain[] => [
  check("password", getFieldValidationMessage("Password", "required")).exists(),
  check("email", getFieldValidationMessage("Email", "invalid"))
    .normalizeEmail()
    .isEmail(),
];
