import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import {
  DRIZZLE_PROVIDER,
  DrizzleClient,
} from "../../server/db/database.module";
import { householdUsers } from "../../server/db/schema";
import { CreateHouseholdUserDto } from "./dto/create-household-user.dto";
import { UpdateHouseholdUserDto } from "./dto/update-household-user.dto";

@Injectable()
export class HouseholdUsersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}
  async create(createHouseholdUserDto: CreateHouseholdUserDto) {
    const [newHouseholdUsers] = await this.db
      .insert(householdUsers)
      .values({
        ...createHouseholdUserDto,
      })
      .returning();
    return newHouseholdUsers;
  }

  async findAll() {
    return this.db
      .select()
      .from(householdUsers)
      .orderBy(householdUsers.userId, householdUsers.householdId);
  }

  async findOne(id: string) {
    const [findOneHouseholdUsers] = await this.db
      .select()
      .from(householdUsers)
      .where(eq(householdUsers.id, id));
    if (!findOneHouseholdUsers) {
      throw new NotFoundException(`No existe el householdUsers con id ${id}`);
    }
    return findOneHouseholdUsers;
  }

  async update(id: string, updateHouseholdUserDto: UpdateHouseholdUserDto) {
    const [updatedHouseholdUsers] = await this.db
      .update(householdUsers)
      .set({
        ...updateHouseholdUserDto,
      })
      .where(eq(householdUsers.id, id))
      .returning();
    if (!updatedHouseholdUsers) {
      throw new NotFoundException(`No existe el householdUsers con id ${id}`);
    }
    return updatedHouseholdUsers;
  }

  async remove(id: string) {
    const [removeHouseholdUsers] = await this.db
      .delete(householdUsers)
      .where(eq(householdUsers.id, id))
      .returning();
    if (!removeHouseholdUsers) {
      throw new NotFoundException(`No existe el householdUsers con id ${id}`);
    }
    return removeHouseholdUsers;
  }
}
