import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Client } from "./entity/Client";
import { Banker } from "./entity/Seller";
import { Transaction } from "./entity/Transaction";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "13579",
  database: "dhiran",
  synchronize: true,
  logging: false,
  entities: [User, Client, Banker, Transaction],
  migrations: [],
  subscribers: [],
});
