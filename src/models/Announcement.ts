import { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    price: { type: Number },
    files: { type: Array, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    title: { type: String, required: true },
    user: { type: Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    description: { type: String, required: true },
  },
  { versionKey: false }
);

export const Announcement = model("Announcement", schema);
