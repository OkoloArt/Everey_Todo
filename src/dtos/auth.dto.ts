import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  MinLength,
} from "class-validator";

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?=.*?[A-Z])/, {
    message: "Password must contain at least one uppercase alphabet.",
  })
  @Matches(/(?=.*?[a-z])/, {
    message: "Password must contain at least one lowercase alphabet.",
  })
  @Matches(/(?=.*?[0-9])/, {
    message: "Password must contain at least one digit.",
  })
  @Matches(/(?=.*?[ #?!@$%^.&*-])/, {
    message:
      "Password must contain at least one special character like '#?!@$%^&*-'.",
  })
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
