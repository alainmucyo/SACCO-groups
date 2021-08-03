import { Injectable } from "@nestjs/common";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Group, GroupStatus } from "./entities/group.entity";

@Injectable()
export class GroupsService {
  async create(name: string, phone_number: string) {
    const group = new Group();
    group.name = name;
    group.phone_number = phone_number;
    return await group.save();
  }

  findAll() {
    return Group.find();
  }

  async findOne(id: number) {
    return await Group.findOne(id);
  }
  async updateStatus(id: number, status: string) {
    const group = await Group.findOne(id);
    if (status === "approved") group.status = GroupStatus.Approved;
    else group.status = GroupStatus.Declined;
    return await group.save();
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
