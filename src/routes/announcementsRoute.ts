import { Router } from "express";

import { AnnouncementController } from "./../controllers";

const router = Router();

router.get("/announcements", AnnouncementController.get);

export { router as announcementsRoute };
