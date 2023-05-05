import { Router } from "express";

import { getUpload } from "../utils";
import { checkAuth } from "../middlewares";
import { AnnouncementController } from "./../controllers";
import { validateAnnouncementCreation } from "../validators";

const router = Router();
const upload = getUpload();

// /announcements
router.post(
  "/",
  [checkAuth, upload.array("files"), ...validateAnnouncementCreation()],
  AnnouncementController.create
);

// /announcements/user
router.get("/user", checkAuth, AnnouncementController.getUserAnnouncements);

export { router as announcementRoute };
