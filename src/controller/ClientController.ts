import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Client } from "../entity/Client";

export class ClientController {
  private clientRepository = AppDataSource.getRepository(Client);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.clientRepository.find();
  }

  async getInfo(request: Request, response: any, next: NextFunction) {
    const id = request.params.id;

    try {
      const singleUser = await this.clientRepository.findOneBy({
        id: id,
      });

      if (!singleUser) return { message: "User Not Registered" };

      const { password: _, ...client } = singleUser;

      response.status(200).json(client);
      return;
    } catch (error) {
      console.error(error.message);
    }
  }
}
