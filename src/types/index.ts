// import { Collection } from "mongodb";

export interface ICar {
  manufacturer: string;
}

// export interface IDatabase {
//   cars: Collection<ICar>;
// }

export interface IUser {
  email: string;
  password: string;
  username: string;
}
