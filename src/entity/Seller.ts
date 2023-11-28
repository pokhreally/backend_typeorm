import {
    Entity,
    BaseEntity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity("banker")
  export class Banker {
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
  
    @Column({
      type: "numeric",
    })
    balance: number;
  
    @Column({
      default: true,
      name: "active",
    })
    is_active: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  