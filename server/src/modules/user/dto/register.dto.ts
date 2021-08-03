import { IsNotEmpty } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
