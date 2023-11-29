import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Client } from "./Client";

export enum TransactionTypes {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

@Entity("transaction")
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: TransactionTypes,
  })
  type: string;

  @Column({
    type: "numeric",
  })
  amount: number;

  @ManyToOne(() => Client, (client) => client.transaction)
  @JoinColumn({
    name: "client_id",
  })
  client: Client;
}
