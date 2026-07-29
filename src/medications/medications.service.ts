import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER, DrizzleClient } from "../../server/db/database.module";
import { medications } from '../../../server/db/schema';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

@Injectable()
export class MedicationsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient
  )
  async create(createMedicationDto: CreateMedicationDto) {
    const [newBatch] = await this.db
      .insert(medications)
      .values({
        ...createMedicationDto,        
      })
      .returning();
    return newBatch;
  }

  async findAll() {
    const [findBatch] = await this.db
    .select().from(medications).orderBy(medications.householdId, medications.brandName);
    return findBatch;
  }

  async findOne(id: string) {
    const [findOneBatch] = await this.db
    .select().from(medications).where(eq(medications.id, id));
    if (!findOneBatch) {
      throw new NotFoundException(`No existe el medicamento con id ${id}`,); 
    }
    return findOneBatch;
  }

  async update(id: string, updateMedicationDto: UpdateMedicationDto) {
    const [updatedBatch] = await this.db
      .update(medications)
      .set({
        ...updateMedicationDto,        
      })
      .where(eq(medications.id, id))
      .returning();
      if (!updatedBatch) {
        throw new NotFoundException(`No existe el medicamento con id ${id}`,);
      }
    return updatedBatch;
  }

  async remove(id: string) {
    const [removeBatch] = await this.db.delete(medications)
    .where(eq(medications.id, id))
    .returning();
    if (!removeBatch) {
      `No existe el medicamento con id ${id}`,
    }
    return removeBatch;
  }
}
