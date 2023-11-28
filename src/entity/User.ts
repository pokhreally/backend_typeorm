import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("user")
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
