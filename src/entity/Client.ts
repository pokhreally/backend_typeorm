import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Person } from "./utils/Person";
import { Transaction } from "./Transaction";

@Entity("client")
export class Client extends Person {
  @OneToMany(() => Transaction, (transaction) => transaction.id)
  transaction: Transaction[];

  @Column({ default: 0 })
  saving: number;

  @CreateDateColumn()
  created_at: Date;
}
