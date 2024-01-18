import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction } from "express";
import { Transaction } from "../entity/Transaction";
import { Client } from "../entity/Client";

export class TransactionController {
  private transactionRepository = AppDataSource.getRepository(Transaction);
  private clientRepository = AppDataSource.getRepository(Client);

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const { sender_id, receiver_id, amount } = request.body;

      // Validation
      if (!sender_id || !receiver_id || !amount) {
        response.status(400).json({ message: "Invalid request parameters" });
        return;
      }

      const senderInfo = await this.clientRepository.findOneBy({
        id: sender_id,
      });
      const receiverInfo = await this.clientRepository.findOneBy({
        id: receiver_id,
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
        await this.transactionRepository.save({
          amount,
          client: [senderInfo, receiverInfo],
        });
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
}
