import multer from "multer";
import { Router } from "express";
import { check } from "express-validator";

import { checkAuth } from "../middlewares";
import { getFieldValidationMessage } from "../utils";
import { AnnouncementController } from "./../controllers";
import {
  INPUT_TYPE_MAX_LENGTH,
  INPUT_TYPE_MIN_LENGTH,
  TEXTAREA_TYPE_MAX_LENGTH,
  TEXTAREA_TYPE_MIN_LENGTH,
} from "../constants";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  [
    checkAuth,
    upload.array("files"),
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
  ],
  AnnouncementController.create
);

export { router as announcementRoute };
