import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Client } from "./entity/Client";
import { Banker } from "./entity/Seller";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "13579",
  database: "dhiran",
  synchronize: true,
  logging: false,
  entities: [User, Client, Banker],
  migrations: [],
  subscribers: [],
});
