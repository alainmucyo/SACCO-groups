import { Injectable } from "@nestjs/common";
import { Group } from "../groups/entities/group.entity";
import { Member } from "./entities/member.entity";

@Injectable()
export class MembersService {
  async create(name: string, phone_number: string, group: Group) {
    const member = new Member();
    member.name = name;
    member.phone_number = phone_number;
    member.group = group;
    await member.save();
    return member;
  }
}
