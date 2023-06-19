import { config } from "dotenv";
import { verify } from "jsonwebtoken";
import { Response, NextFunction } from "express";

import { IJwtPayload, IRequest } from "./types";

config();

const { JWT_SECRET } = process.env;

export const checkAuth = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No authorization" });
    }

    req.user = verify(token, JWT_SECRET as string) as IJwtPayload;

    if (req.user.exp && req.user.exp <= Date.now() / 1000) {
      return res.status(401).json({ message: "Authorization token expired" });
    }

    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ message: err.message });
    }
  }
};
