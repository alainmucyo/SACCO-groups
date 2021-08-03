import { UserService } from "./user.service";
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth/auth.service";

@Controller("api/users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post("/register")
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.userService.findUserByUsername(
      registerDto.username,
    );
    if (user != null)
      throw new BadRequestException(["Username have been already used"]);
    return this.authService.register(
      registerDto.name,
      registerDto.username,
      registerDto.password,
    );
  }

  @Post("/login")
  @UseGuards(AuthGuard("local"))
  async login(@Request() req) {
    return this.authService.login(req);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/check")
  @UseInterceptors(ClassSerializerInterceptor)
  checkLogin(@Request() req) {
    return req.user;
  }
}
