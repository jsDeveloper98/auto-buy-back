import { Router } from "express";

import { getUpload } from "../utils";
import { checkAuth } from "../middlewares";
import { AnnouncementController } from "./../controllers";
import { validateAnnouncementCreation } from "../validators";

const router = Router();
const upload = getUpload();

router.post(
  "/users/:userId/announcements",
  [checkAuth, upload.array("images"), ...validateAnnouncementCreation()],
  AnnouncementController.create
);

router.get(
  "/users/:userId/announcements",
  checkAuth,
  AnnouncementController.get
);

export { router as userRoute };
