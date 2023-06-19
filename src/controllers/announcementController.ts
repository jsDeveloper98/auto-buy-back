import { config } from "dotenv";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { Announcement } from "../models/Announcement";

config();

class AnnouncementC {
  async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          data: null,
          errors: errors.array(),
          message: "Wrong data for announcement",
        });
      }

      const files =
        Array.isArray(req.files) &&
        req.files.map((file) => ({
          path: file.path,
          filename: file.filename,
          url: `uploads/${file.filename}`,
        }));

      const announcementModel = new Announcement({
        ...req.body,
        files,
        user: req.params.userId,
      });

      const announcement = await announcementModel.save();

      res.status(201).json({
        data: announcement,
        message: "Successfully created",
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message, data: null });
      }
    }
  }

  async get(req: Request, res: Response) {
    try {
      const announcements = await Announcement.find({
        user: req.params.userId,
      });

      res.json({
        data: announcements,
        message: "Successfully fetched",
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message, data: null });
      }
    }
  }
}

export const AnnouncementController = new AnnouncementC();
