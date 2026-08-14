import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER } from '../../server/db/database.module';
import type { DrizzleClient } from '../../server/db/database.module';
import { medications } from '../../server/db/schema';
import type { InferInsertModel } from 'drizzle-orm';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

type MedicationsInsert = InferInsertModel<typeof medications>;

@Injectable()
export class MedicationsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}

  async create(householdId: string, createMedicationDto: CreateMedicationDto) {
    const [newMedication] = await this.db
      .insert(medications)
      .values({
        ...(createMedicationDto as unknown as MedicationsInsert),
        householdId,
      })
      .returning();
    return newMedication;
  }

  async findAllByHousehold(householdId: string) {
    return this.db
      .select()
      .from(medications)
      .where(eq(medications.householdId, householdId))
      .orderBy(medications.brandName);
  }

  async findOne(householdId: string, id: string) {
    const [medication] = await this.db
      .select()
      .from(medications)
      .where(
        and(eq(medications.id, id), eq(medications.householdId, householdId)),
      );
    if (!medication) {
      throw new NotFoundException(
        `No existe el medicamento ${id} en el hogar ${householdId}`,
      );
    }
    return medication;
  }

  async update(
    householdId: string,
    id: string,
    updateMedicationDto: UpdateMedicationDto,
  ) {
    const [updatedMedication] = await this.db
      .update(medications)
      .set(updateMedicationDto as unknown as Partial<MedicationsInsert>)
      .where(
        and(eq(medications.id, id), eq(medications.householdId, householdId)),
      )
      .returning();
    if (!updatedMedication) {
      throw new NotFoundException(
        `No existe el medicamento ${id} en el hogar ${householdId}`,
      );
    }
    return updatedMedication;
  }

  async remove(householdId: string, id: string) {
    const [removedMedication] = await this.db
      .delete(medications)
      .where(
        and(eq(medications.id, id), eq(medications.householdId, householdId)),
      )
      .returning();
    if (!removedMedication) {
      throw new NotFoundException(
        `No existe el medicamento ${id} en el hogar ${householdId}`,
      );
    }
    return removedMedication;
  }
}
