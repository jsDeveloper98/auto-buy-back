import { config } from "dotenv";
import { sign } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { User } from "../models";
import { IUser } from "../types";
import { Announcement } from "../models/Announcement";

config();

const { JWT_SECRET } = process.env;

// TODO finish announcement creation

class AnnouncementC {
  async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Wrong data for announcement", data: null, errors });
      }

      const files =
        Array.isArray(req.files) &&
        req.files.map((file) => {
          return {
            filename: file.filename,
            path: file.path,
            url: `uploads/${file.filename}`,
          };
        });

      const announcementModel = new Announcement({
        ...req.body,
        files,
      });

      const announcement = await announcementModel.save();

      console.log("%c announcement ===>", "color: #90ee90", announcement);

      res.status(201).json({
        message: "Successfully created",
        data: announcement,
      });
    } catch (e: any) {
      res.status(400).json({ message: e.message, data: null });
    }
  }
}

export const AnnouncementController = new AnnouncementC();
