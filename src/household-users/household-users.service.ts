import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER } from '../../server/db/database.module';
import type { DrizzleClient } from '../../server/db/database.module';
import { householdUsers } from '../../server/db/schema';
import type { InferInsertModel } from 'drizzle-orm';
import { CreateHouseholdUserDto } from './dto/create-household-user.dto';
import { UpdateHouseholdUserDto } from './dto/update-household-user.dto';

type HouseholdUsersInsert = InferInsertModel<typeof householdUsers>;

@Injectable()
export class HouseholdUsersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}
  async create(createHouseholdUserDto: CreateHouseholdUserDto) {
    const [newHouseholdUsers] = await this.db
      .insert(householdUsers)
      .values(createHouseholdUserDto as unknown as HouseholdUsersInsert)
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

  async findMembership(userId: string, householdId: string) {
    const [membership] = await this.db
      .select({
        id: householdUsers.id,
        householdId: householdUsers.householdId,
        userId: householdUsers.userId,
        role: householdUsers.role,
      })
      .from(householdUsers)
      .where(
        and(
          eq(householdUsers.userId, userId),
          eq(householdUsers.householdId, householdId),
        ),
      );
    return membership;
  }

  async findByHousehold(householdId: string) {
    return this.db
      .select()
      .from(householdUsers)
      .where(eq(householdUsers.householdId, householdId));
  }

  async update(id: string, updateHouseholdUserDto: UpdateHouseholdUserDto) {
    const [updatedHouseholdUsers] = await this.db
      .update(householdUsers)
      .set(updateHouseholdUserDto as unknown as Partial<HouseholdUsersInsert>) // cast
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
