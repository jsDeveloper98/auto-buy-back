import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
  },
  { versionKey: false }
);

export const User = model("User", schema);
