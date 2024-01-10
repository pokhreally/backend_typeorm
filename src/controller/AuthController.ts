import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Person } from "../entity/utils/Person";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

interface UserBody {
  email: string;
  password: string;
}

interface UserDB {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export class AuthController {
  private authRepository = AppDataSource.getRepository(Person);

  async save(request: Request, response: Response, next: NextFunction) {
    const { first_name, last_name, email, password } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPerson = Object.assign(new Person(), {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    try {
      const { password: _, ...user } = await this.authRepository.save(
        newPerson
      );
      return { message: "User created successfully", user };
    } catch (error) {
      if (error.code === "23505") {
        response.status(401).json({ message: "Email Already Exists" });
      }
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const userFromBody = request.body;
    const userFromDB = await this.authRepository.findOneBy({
      email: userFromBody.email,
    });

    if (userFromDB) {
      const result = this.getToken(userFromBody, userFromDB);
      return result;
    } else {
      return { message: "Invalid Email" };
    }
  }

  async getToken(userFromBody: UserBody, userFromDB: UserDB) {
    if (await bcrypt.compare(userFromBody.password, userFromDB.password)) {
      const access_token = jwt.sign(
        {
          userId: userFromDB.id,
          first_name: userFromDB.first_name,
          last_name: userFromDB.last_name,
        },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "1hr" }
      );

      const refresh_token = jwt.sign(
        {
          userId: userFromDB.id,
          first_name: userFromDB.first_name,
          last_name: userFromDB.last_name,
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
