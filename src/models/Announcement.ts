import { Schema, model } from "mongoose";

const schema = new Schema({
  price: { type: Number },
  description: { type: String, required: true },
  model: { type: String, required: true },
  title: { type: String, required: true },
  files: { type: Array, required: true },
  manufacturer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Announcement = model("Announcement", schema);
