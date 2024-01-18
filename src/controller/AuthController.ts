import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Client } from "../entity/Client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import Flatted = require("flatted");

dotenv.config();

interface UserBody {
  email: string;
  saving?: number;
  password: string;
}

interface UserDB {
  id?: string;
  email: string;
  password: string;
}

export class AuthController {
  private clientRepository = AppDataSource.getRepository(Client);

  async save(request: Request, response: Response, next: NextFunction) {
    const { email, password, saving } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPerson = Object.assign(new Client(), {
      email,
      saving,
      password: hashedPassword,
    });
    try {
      const { password: _, ...user } = await this.clientRepository.save(
        newPerson
      );
      response.status(201).json({ message: "User created successfully" });
      return;
    } catch (error) {
      if (error.code === "23505") {
        response.status(200).json({ message: "Email Already Exist" });
        return;
      }
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const userFromBody = request.body;
      const userFromDB = await this.clientRepository.findOneBy({
        email: userFromBody.email,
      });
      if (userFromDB) {
        const token = await this.getToken(userFromBody, userFromDB);
        return token;
      } else {
        response.status(401).json({ message: "Invalid Email" });
        return;
      }
    } catch (error) {
      console.log("message:", error);
    }
  }

  async getToken(userFromBody: UserBody, userFromDB: UserDB) {
    if (await bcrypt.compare(userFromBody.password, userFromDB.password)) {
      const access_token = jwt.sign(
        {
          userId: userFromDB.id,
        },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "1hr" }
      );

      const refresh_token = jwt.sign(
        {
          userId: userFromDB.id,
        },
        process.env.REFRESH_SECRET_KEY,
        {
          expiresIn: "4d",
        }
      );
      return { access_token, refresh_token };
    } else {
      return { message: "Invalid Password" };
    }
  }
}
