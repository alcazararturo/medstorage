import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Inject,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "../users/dto/login.dto";
import { DRIZZLE_PROVIDER } from "../../server/db/database.module";
import type { DrizzleClient } from "../../server/db/database.module";
import { users, households, householdUsers } from "../../server/db/schema";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}

  async register(registerDto: RegisterDto) {
    const email = registerDto.email.trim().toLowerCase();
    const fullName = registerDto.fullName.trim();
    const householdName = registerDto.householdName.trim();

    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      throw new ConflictException("El correo electrónico ya está registrado");
    }

    const passwordHash = await argon2.hash(registerDto.password, {
      type: argon2.argon2id,
    });

    const { user, household } = await this.db.transaction(async (tx) => {
      const [newUser] = await tx
        .insert(users)
        .values({
          email,
          passwordHash,
          fullName,
        })
        .returning({
          id: users.id,
          email: users.email,
          fullName: users.fullName,
          role: users.role,
          isActive: users.isActive,
          createdAt: users.createdAt,
        });

      const [newHousehold] = await tx
        .insert(households)
        .values({
          name: householdName,
        })
        .returning({
          id: households.id,
          name: households.name,
          createdAt: households.createdAt,
        });

      await tx.insert(householdUsers).values({
        userId: newUser.id,
        householdId: newHousehold.id,
        role: "owner",
      });

      return {
        user: newUser,
        household: newHousehold,
      };
    });

    const payload = {
      sub: user.id,
      role: user.role,
    };

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      household: {
        id: household.id,
        name: household.name,
      },
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user || !user.isActive) {
      throw new UnauthorizedException("Credenciales incorrectas");
    }

    // Verificar contraseña usando Argon2

    let isPasswordValid = false;

    try {
      isPasswordValid = await argon2.verify(
        user.passwordHash,
        loginDto.password,
      );
    } catch (error) {
      isPasswordValid = false;
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException("Credenciales incorrectas");
    }

    const payload = { sub: user.id, role: user.role };

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
