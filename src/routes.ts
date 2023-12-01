import { UserController } from "./controller/UserController";
import { ClientController } from "./controller/ClientController";
import { AuthController } from "./controller/AuthController";

export const UserRoutes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },
];

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
