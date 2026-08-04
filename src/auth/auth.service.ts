import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "../users/dto/login.dto";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user || !user.isActive) {
      throw new UnauthorizedException(
        "Credenciales incorrectas o cuenta inactiva",
      );
    }

    // Verificar contraseña usando Argon2
    const isPasswordValid = await argon2.verify(
      user.passwordHash,
      loginDto.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Credenciales incorrectas");
    }

    // Generar Payload del JWT (No metas datos sensibles aquí)
    const payload = { sub: user.id, email: user.email };

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
