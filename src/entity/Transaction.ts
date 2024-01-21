import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  JoinTable,
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

  @ManyToMany(() => Client, (client) => client.id, { cascade: false })
  @JoinTable()
  client: Client[];

  @Column({ enum: TransactionTypes })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
