import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Person } from "./utils/Person";
import { Transaction } from "./Transaction";

@Entity("client")
export class Client extends Person {
  @Column({
    unique: true,
    length: 10,
  })
  card_number: string;

  @Column({
    unique: true,
  })
  employee_id: number;

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transaction: Transaction[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
