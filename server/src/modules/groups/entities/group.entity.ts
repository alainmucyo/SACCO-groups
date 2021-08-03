import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Member } from "../../members/entities/member.entity";

export enum GroupStatus {
  Pending = "pending",
  Approved = "approved",
  Declined = "declined",
}
@Entity("groups")
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column()
  phone_number: string;

  @Column({
    enum: GroupStatus,
    type: "enum",
    default: GroupStatus.Pending,
  })
  status: GroupStatus;

  @OneToMany(() => Member, (member) => member.group)
  members: Member[];

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
