import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction } from "express";
import { Transaction, TransactionTypes } from "../entity/Transaction";
import { Client } from "../entity/Client";

export class TransactionController {
  private transactionRepository = AppDataSource.getRepository(Transaction);
  private clientRepository = AppDataSource.getRepository(Client);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.transactionRepository.find({
      relations: { sender: true, receiver: true },
    });
  }

  async transfer(request: Request, response: Response, next: NextFunction) {
    try {
      const { sender_number, receiver_number, amount } = request.body;

      // Validation
      if (!sender_number || !receiver_number || !amount) {
        response.status(400).json({ message: "Invalid request parameters" });
        return;
      } else if (sender_number === receiver_number) {
        response
          .status(400)
          .json({
            message:
              "Invalid request parameters (cannot transfer to the entered ID)",
          });
        return;
      }

      const senderInfo = await this.clientRepository.findOneBy({
        phone: sender_number,
      });
      const receiverInfo = await this.clientRepository.findOneBy({
        phone: receiver_number,
      });

      // Check if sender has enough credits
      if (senderInfo.saving === null || senderInfo.saving < amount) {
        response.status(401).json({ message: "Not Enough Credits" });
        return;
      }

      // Perform balance transfer within a database transaction
      await AppDataSource.transaction(async (entityManager) => {
        await this.updateBalance(
          senderInfo,
          receiverInfo,
          amount,
          entityManager
        );
        await this.transactionRepository.save([
          {
            amount: parseInt(amount),
            sender: senderInfo,
            receiver: receiverInfo,
          },
        ]);
      });

      response.status(200).json({ message: "Transfer successful" });
      return;
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }

  private async updateBalance(senderInfo, receiverInfo, amount, entityManager) {
    // Update sender's balance
    await entityManager.save(Client, {
      ...senderInfo,
      saving: senderInfo.saving - parseInt(amount),
    });

    // Update receiver's balance
    await entityManager.save(Client, {
      ...receiverInfo,
      saving: receiverInfo.saving + parseInt(amount),
    });
  }

  async getTransactions(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = request.params.id;

    try {
      const sender = await this.transactionRepository.find({
        where: [{ sender: { id } }, { receiver: { id } }],
        order: { created_at: "DESC" },
        relations: { sender: true, receiver: true },
      });

      if (!sender) {
        response.sendStatus(400).json({ message: "Invalid Credentials" });
        return;
      }

      response.status(200).json(sender);
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
