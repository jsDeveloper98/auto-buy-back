import { Request } from "express";
import { ObjectId } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export interface IUser {
  email: string;
  password: string;
  username: string;
}

export interface IJwtPayload extends JwtPayload {
  userId: ObjectId;
}

export interface IRequest extends Request {
  user?: IJwtPayload;
}
