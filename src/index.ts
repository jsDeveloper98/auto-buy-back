import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

import { authRoute, announcementRoute } from "./routes";

config();

const app = express();
const { PORT, MONGO_URI } = process.env;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoute);
app.use("/announcements", announcementRoute);

const connectDatabase = async (): Promise<typeof mongoose> => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(MONGO_URI as string);
};

const init = () => {
  try {
    connectDatabase().then(() => {
      app.listen(PORT, () => {
        console.log(`App is Running on http://localhost:${PORT}`);
      });
    });
  } catch (err) {
    console.log(`Server error: ${err}`);
  }
};

init();
