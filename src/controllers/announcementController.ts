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
    console.log("%c req ===>", "color: #90ee90", req.body);
    console.log("Files:", req.files);
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

      console.log("%c files777777 ===>", "color: #90ee90", files);

      console.log({
        ...req.body,
        files,
      });

      const newMyModel = new Announcement({
        ...req.body,
        images: files,
      });

      console.log("%c newMyModel ===>", "color: #90ee90", newMyModel);
    } catch (e: any) {
      res.status(400).json({ message: e.message, data: null });
    }
  }
}

export const AnnouncementController = new AnnouncementC();
