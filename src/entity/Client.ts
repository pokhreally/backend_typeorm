import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Person } from "./utils/Person";
import { Transaction } from "./Transaction";

@Entity("client")
export class Client extends Person {
  @ManyToMany(() => Transaction, (transaction) => transaction.id, {
    cascade: false,
  })
  transaction: Transaction[];

  @Column({ default: 0 })
  saving: number;

  @CreateDateColumn()
  created_at: Date;
}
