import { PrimaryGeneratedColumn, Column } from "typeorm";

export class Person {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ unique: true, nullable: false, length: 10 })
  phone: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
