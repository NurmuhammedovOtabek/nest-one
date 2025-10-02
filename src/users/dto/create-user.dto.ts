import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "user1",
    description: "Foydalanuvchi ismi",
  })
  name: string;

  @ApiProperty({
    example: "user@mail.uz",
    description: "Foydalanuvchi email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "1234567",
    description: "Foydalanuvchi paroli",
  })
//   @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: "Admin",
    description: "Foydalanuvchi value",
  })
  value: string;
}
