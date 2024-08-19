import { Repository, DataSource } from "typeorm";
import { User } from "../typeorm/user.entity";
import { RegisterUserDto } from "../dtos/auth.dto";

export class UserService {
  private readonly userRepo: Repository<User>;

  constructor(dataSource: DataSource) {
    this.userRepo = dataSource.getRepository(User);
  }

  async createUser(
    registerUserDto: RegisterUserDto
  ): Promise<{ status: number; message: string }> {
    const { email, password } = registerUserDto;

    const userExists = await this.findUserByEmail(email);

    if (userExists) {
      throw new Error("User already exists");
    }

    const user = this.userRepo.create(registerUserDto);

    try {
      await this.userRepo.save(user);
    } catch (error) {
      return {
        status: 400,
        message: "Failed to save user to database",
      };
    }

    return {
      status: 200,
      message: "User was created successfully",
    };
  }

  async findUserByEmail(email: string): Promise<User> {
    const foundUser = await this.userRepo.findOneBy({ email });

    if (!foundUser) throw new Error("User not found");

    return foundUser;
  }

  async findUserById(userId: string): Promise<User> {
    const foundUser = await this.userRepo.findOneBy({ id: userId });

    if (!foundUser) throw new Error("User not found");

    return foundUser;
  }
}
