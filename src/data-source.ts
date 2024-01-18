import "reflect-metadata";
import { DataSource } from "typeorm";
import { Client } from "./entity/Client";
import { Transaction } from "./entity/Transaction";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "13579",
  database: "bankapp",
  synchronize: true,
  logging: false,
  entities: [Client, Transaction],
  migrations: [],
  subscribers: [],
});
