import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("person")
export class Person {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;
}
