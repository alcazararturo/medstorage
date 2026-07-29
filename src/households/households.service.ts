import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER, DrizzleClient } from "../../server/db/database.module";
import { households } from '../../../server/db/schema';
import { CreateHouseholdDto } from './dto/create-household.dto';
import { UpdateHouseholdDto } from './dto/update-household.dto';

@Injectable()
export class HouseholdsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient
  )
  async create(createHouseholdDto: CreateHouseholdDto) {
    const [newBatch] = await this.db
      .insert(households)
      .values({
        ...createHouseholdDto,        
      })
      .returning();
    return newBatch;
  }

  async findAll() {
    const [findBatch] = await this.db
    .select().from(households).orderBy(households.name);
    return findBatch;
  }

  async findOne(id: string) {
    const [findOneBatch] = await this.db
    .select().from(households).where(eq(households.id, id));
    if (!findOneBatch) {
      throw new NotFoundException(`No existe el households con id ${id}`,); 
    }
    return findOneBatch;
  }

  async update(id: string, updateHouseholdDto: UpdateHouseholdDto) {
    const [updatedBatch] = await this.db
      .update(households)
      .set({
        ...updateHouseholdDto,        
      })
      .where(eq(households.id, id))
      .returning();
      if (!updatedBatch) {
        throw new NotFoundException(`No existe el households con id ${id}`,);
      }
    return updatedBatch;
  }

  async remove(id: string) {
    const [removeBatch] = await this.db.delete(households)
    .where(eq(households.id, id))
    .returning();
    if (!removeBatch) {
      `No existe el households con id ${id}`,
    }
    return removeBatch;
  }
}
