import { Collection } from "mongodb";
import { ObjectId, Document } from "mongoose";

export interface ICar extends Document {
  manufacturer: string;
  _id: ObjectId;
}

export interface IDatabase {
  cars: Collection<ICar>;
}
