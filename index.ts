import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

import { ICar, IDatabase } from "./types";

config();

const { PORT } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

// app.use("/car", carRoute);

const connectDatabase = async (): Promise<IDatabase> => {
  // const client = await mongoose.connect(process.env.MONGO_URI as string);
  // const { db } = client.connection;
  // return {
  //   cars: db.collection<ICar>("cars"),
  // };


  // const conn = mongoose.createConnection(process.env.MONGO_URI as string);

  // conn.model("Car", require("../schemas/user"));

  // return conn;
};

const init = async () => {
  try {
    await connectDatabase();
    app.listen(PORT);

    console.log(`App is Running on http://localhost:${PORT}`);
  } catch (err) {
    console.log(`Server error: ${err}`);
  }
};

init();
