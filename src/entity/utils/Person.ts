import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Person {
  @PrimaryColumn()
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
  age: number;
}
