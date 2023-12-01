import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Client } from "../entity/Client";

export class ClientController {
  private clientRepository = AppDataSource.getRepository(Client);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.clientRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const client = await this.clientRepository.findOne({
      where: { id },
    });

    if (!client) return "User Not Registered";

    return client;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { first_name, last_name, email, card_number, employee_id, age } =
      request.body;

    try {
      const client = Object.assign(new Client(), {
        first_name,
        last_name,
        email,
        card_number,
        employee_id,
        age,
      });
      const newClient = await this.clientRepository.save(client);

      return newClient;
    } catch (error) {
      console.error(error.detail);
      console.error(error.message);
    }
  }
}
