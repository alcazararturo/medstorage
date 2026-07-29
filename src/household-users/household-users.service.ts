import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER, DrizzleClient } from "../../server/db/database.module";
import { householdUsers } from '../../../server/db/schema';
import { CreateHouseholdUserDto } from './dto/create-household-user.dto';
import { UpdateHouseholdUserDto } from './dto/update-household-user.dto';

@Injectable()
export class HouseholdUsersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient
  )
  async create(createHouseholdUserDto: CreateHouseholdUserDto) {
    const [newBatch] = await this.db
      .insert(householdUsers)
      .values({
        ...createHouseholdUserDto,        
      })
      .returning();
    return newBatch;
  }

  async findAll() {
    const [findBatch] = await this.db
    .select().from(householdUsers).orderBy(householdUsers.userId, householdUsers.householdId);
    return findBatch;
  }

  async findOne(id: string) {
    const [findOneBatch] = await this.db
    .select().from(householdUsers).where(eq(householdUsers.id, id));
    if (!findOneBatch) {
      throw new NotFoundException(`No existe el householdUsers con id ${id}`,); 
    }
    return findOneBatch;
  }

  async update(id: string, updateHouseholdUserDto: UpdateHouseholdUserDto) {
    const [updatedBatch] = await this.db
      .update(householdUsers)
      .set({
        ...updateHouseholdUserDto,        
      })
      .where(eq(householdUsers.id, id))
      .returning();
      if (!updatedBatch) {
        throw new NotFoundException(`No existe el householdUsers con id ${id}`,);
      }
    return updatedBatch;
  }

  async remove(id: string) {
    const [removeBatch] = await this.db.delete(householdUsers)
    .where(eq(householdUsers.id, id))
    .returning();
    if (!removeBatch) {
      `No existe el householdUsers con id ${id}`,
    }
    return removeBatch;
  }
}
