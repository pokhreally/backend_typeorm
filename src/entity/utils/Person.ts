import { PrimaryGeneratedColumn, Column } from "typeorm";

export class Person {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;
}
