import { ValidationChain, check } from "express-validator";

import { getFieldValidationMessage } from "./utils";
import {
  MIN_CAR_PRICE,
  MAX_CAR_PRICE,
  INPUT_TYPE_MAX_LENGTH,
  INPUT_TYPE_MIN_LENGTH,
  TEXTAREA_TYPE_MAX_LENGTH,
  TEXTAREA_TYPE_MIN_LENGTH,
} from "./constants";

export const validateAnnouncementCreation = (): ValidationChain[] => [
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
  check("images").custom((value, { req }) => {
    if (!req.files || req.files.length < 1) {
      throw new Error(getFieldValidationMessage("Image", "required"));
    }

    return true;
  }),
  check("price", getFieldValidationMessage("Price", "required"))
    .isNumeric()
    .exists()
    .custom((value) => {
      if (
        parseFloat(value) < MIN_CAR_PRICE ||
        parseFloat(value) > MAX_CAR_PRICE
      ) {
        throw new Error(
          `Value must be between ${MIN_CAR_PRICE} and ${MAX_CAR_PRICE}`
        );
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
