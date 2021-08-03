import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";

@Injectable()
export class UserService {

  async storeUser({ name, username, password }) {
    const user = new User();
    user.name = name;
    user.username = username;
    user.password = password;
    return await user.save();
  }

  async findUserByUsername(username: string) {
    return User.findOne({ where: { username } });
  }
  findById(id: number) {
    return User.findOne(id);
  }
}
