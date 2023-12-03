// import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { AuthRoutes, ClientRoutes, UserRoutes } from "./routes";
import * as cors from "cors";

const express = require("express");
// const cors = require("cors");

const app = express();

// app.use(cors());

const middleware = (req, res, next) => {
  console.log("Hello from client");
  next();
};

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    UserRoutes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    ClientRoutes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    AuthRoutes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        middleware,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    app.listen(3000);

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/ to see results"
    );
  })
  .catch((error) => console.log(error));
