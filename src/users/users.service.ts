import { Injectable, Inject, ConflictException } from "@nestjs/common";
import { DRIZZLE_PROVIDER } from "../../server/db/database.module";
import type { DrizzleClient } from "../../server/db/database.module";
import { users } from "../../server/db/schema";
import { eq } from "drizzle-orm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as argon2 from "argon2";

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly db: DrizzleClient) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, fullName } = createUserDto;

    // Verificar si el email ya existe
    const existingUser = await this.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException("El correo electrónico ya está registrado");
    }

    // Hashear contraseña con Argon2
    const passwordHash = await argon2.hash(password);

    // Insertar en Neon Postgres
    const [newUser] = await this.db
      .insert(users)
      .values({
        email: email.toLowerCase(),
        passwordHash,
        fullName,
      })
      .returning({
        id: users.id,
        email: users.email,
        fullName: users.fullName,
        createdAt: users.createdAt,
      });

    return newUser;
  }

  async findOneByEmail(email: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    return user || null;
  }

  async findOneById(id: string) {
    const [user] = await this.db
      .select({
        id: users.id,
        email: users.email,
        fullName: users.fullName,
        isActive: users.isActive,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user || null;
  }
}
