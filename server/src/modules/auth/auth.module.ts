import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocaleStrategy } from "./local.strategy";
import "dotenv";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: "60000s" },
    }),
  ],
  providers: [AuthService, LocaleStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
