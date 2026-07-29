import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER, DrizzleClient } from "../../server/db/database.module";
import { allergies } from '../../../server/db/schema';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';

@Injectable()
export class AllergiesService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient
  )
  async create(createAllergyDto: CreateAllergyDto) {
    const [newBatch] = await this.db
      .insert(allergies)
      .values({
        ...createAllergyDto,        
      })
      .returning();
    return newBatch;
  }

  async findAll() {
    const [findBatch] = await this.db
    .select().from(allergies).orderBy(allergies.familyMemberId, allergies.allergenName);
    return findBatch;
  }

  async findOne(id: string) {
    const [findOneBatch] = await this.db
    .select().from(allergies).where(eq(allergies.id, id));
    if (!findOneBatch) {
      throw new NotFoundException(`No existe el allergies con id ${id}`,); 
    }
    return findOneBatch;
  }

  async update(id: string, updateAllergyDto: UpdateAllergyDto) {
    const [updatedBatch] = await this.db
      .update(allergies)
      .set({
        ...updateAllergyDto,        
      })
      .where(eq(allergies.id, id))
      .returning();
      if (!updatedBatch) {
        throw new NotFoundException(`No existe el allergies con id ${id}`,);
      }
    return updatedBatch;
  }

  async remove(id: string) {
    const [removeBatch] = await this.db.delete(allergies)
    .where(eq(allergies.id, id))
    .returning();
    if (!removeBatch) {
      `No existe el allergies con id ${id}`,
    }
    return removeBatch;
  }
}
