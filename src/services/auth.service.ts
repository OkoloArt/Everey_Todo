import { dataSource } from "../configs/configDB";
import { LoginDto, RegisterUserDto } from "../dtos/auth.dto";
import { comparePasswords, hashPassword } from "../utils/bcrypt.utils";
import { UserService } from "./user.service";

export class AuthService {
  readonly userService = new UserService(dataSource);

  async registerUser(userDto: RegisterUserDto) {
    try {
      const { password, email } = userDto;
      const hashedPassword = await hashPassword(password);
      const result = await this.userService.createUser({
        email,
        password: hashedPassword,
      });
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unknown error occurred during registration");
    }
  }

  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findUserByEmail(email);
    const userPasswordMatch = await comparePasswords(password, user.password);

    if (!userPasswordMatch) {
      throw new Error("Invalid credentials");
    }

    return {
      status: 200,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
