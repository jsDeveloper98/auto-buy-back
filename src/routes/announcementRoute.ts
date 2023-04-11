import { AnnouncementController } from "./../controllers/announcementController";
import { Router } from "express";
import { check } from "express-validator";
import multer from "multer";

import { AuthController } from "../controllers";

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

// TODO: correct all error messages
router.post(
  "/",
  [
    upload.array("files"),
    check("title", "Wrong title").isLength({ min: 6, max: 30 }),
    check("model", "Wrong model").exists(),
    check("manufacturer", "Wrong manufacturer").exists(),
    check("description", "Wrong description").isLength({ min: 20, max: 400 }),
    check("files").custom((value, { req }) => {
      if (!req.files || req.files.length < 1) {
        throw new Error("Wrong files");
      }
      return true;
    }),
  ],
  AnnouncementController.create
);

export { router as announcementRoute };
