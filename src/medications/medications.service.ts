import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER, DrizzleClient } from "../../server/db/database.module";
import { medications } from '../../server/db/schema';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

@Injectable()
export class MedicationsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient
  )
  async create(createMedicationDto: CreateMedicationDto) {
    const [newMedications] = await this.db
      .insert(medications)
      .values({
        ...createMedicationDto,        
      })
      .returning();
    return newMedications;
  }

  async findAll() {
    return this.db
    .select()
    .from(medications)
    .orderBy(medications.householdId, medications.brandName);
  }

  async findOne(id: string) {
    const [findOneMedications] = await this.db
    .select().from(medications).where(eq(medications.id, id));
    if (!findOneMedications) {
      throw new NotFoundException(`No existe el medicamento con id ${id}`,); 
    }
    return findOneMedications;
  }

  async update(id: string, updateMedicationDto: UpdateMedicationDto) {
    const [updatedMedications] = await this.db
      .update(medications)
      .set({
        ...updateMedicationDto,        
      })
      .where(eq(medications.id, id))
      .returning();
      if (!updatedMedications) {
        throw new NotFoundException(`No existe el medicamento con id ${id}`,);
      }
    return updatedMedications;
  }

  async remove(id: string) {
    const [removeMedications] = await this.db.delete(medications)
    .where(eq(medications.id, id))
    .returning();
    if (!removeMedications) {
      throw new NotFoundException(
        `No existe el medicamento con id ${id}`,
      );      
    }
    return removeMedications;
  }
}
