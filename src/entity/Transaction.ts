import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
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
    type: "numeric",
    nullable: true,
  })
  amount: number;

  @ManyToOne(() => Client, (client) => client.id)
  sender: Client;

  @ManyToOne(() => Client, (client) => client.id)
  receiver: Client;

  @Column({ default: "Cash Transfer" })
  remarks: string;

  @CreateDateColumn()
  created_at: Date;
}
