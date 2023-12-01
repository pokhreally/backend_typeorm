import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Person } from "../entity/utils/Person";
import * as bcrypt from "bcrypt";

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
    await this.authRepository.save(newPerson);

    return "User Created Successfully";
  }
}
