import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersService],
  exports: [UsersService], // Lo exportamos para que AuthModule pueda buscar usuarios
})
export class UsersModule {}
