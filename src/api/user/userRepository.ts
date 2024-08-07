import type { UpdatUserProfileDto, User } from "@/api/user/userModel";
import { USER_ROLES, userModel } from "./userSchema";
import type { RegisterUserDto } from "../auth/authModel";

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    return await userModel.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await userModel.findOne({ email });
  }

  async create(payload: RegisterUserDto): Promise<User> {
    return (await userModel.create(payload)) as unknown as User;
  }

  async findMentor(_id: string): Promise<User | null> {
    return await userModel.findOne({ _id, role: USER_ROLES.MENTOR });
  }

  async update(_id: string, payload: UpdatUserProfileDto) {
    return await userModel.findOneAndUpdate({ _id }, payload, { new: true });
  }
}
