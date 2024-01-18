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
    action: "one",
  },
  {
    method: "post",
    route: "/client",
    controller: ClientController,
    action: "save",
  },
  {
    method: "post",
    route: "/transfer",
    controller: TransactionController,
    action: "save",
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
];
