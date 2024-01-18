// import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { AuthRoutes, ClientRoutes } from "./routes";
import * as cors from "cors";
import * as admin from "firebase-admin";
const { GoogleToken } = require("gtoken");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const gToken = new GoogleToken({
  keyFile: "key/notifyKey.json",
  eagerRefreshThresholdMillis: 5 * 60 * 1000,
  scope: ["profile", "email"],
});

gToken.getToken((err, tokens) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(tokens);
});

const express = require("express");
// const cors = require("cors");

const app = express();
// app.use(cors());

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(express.json());

    // register express routes from defined application routes

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
