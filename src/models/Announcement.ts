import { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    price: { type: Number, required: true },
    make: { type: String, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true },
    title: { type: String, required: true },
    images: { type: Array, required: true },
    user: { type: Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    description: { type: String, required: true },
  },
  { versionKey: false }
);

export const Announcement = model("Announcement", schema);
