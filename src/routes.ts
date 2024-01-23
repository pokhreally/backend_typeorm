import { ClientController } from "./controller/ClientController";
import { AuthController } from "./controller/AuthController";
import { TransactionController } from "./controller/TransactionController";

export const ClientRoutes = [
  {
    method: "get",
    route: "/client",
    controller: ClientController,
    action: "all",
  },
  {
    method: "get",
    route: "/client/:id",
    controller: ClientController,
    action: "getInfo",
  },
  {
    method: "get",
    route: "/transactions",
    controller: TransactionController,
    action: "all",
  },
  {
    method: "get",
    route: "/transactions/:id",
    controller: TransactionController,
    action: "getTransactions",
  },
  {
    method: "post",
    route: "/transfer",
    controller: TransactionController,
    action: "transfer",
  },
];

export const AuthRoutes = [
  {
    method: "post",
    route: "/register",
    controller: AuthController,
    action: "save",
  },
  {
    method: "post",
    route: "/login",
    controller: AuthController,
    action: "one",
  },
  {
    method: "post",
    route: "/refresh",
    controller: AuthController,
    action: "one",
  },
  {
    method: "post",
    route: "/notify",
    controller: AuthController,
    action: "notify",
  },
];
