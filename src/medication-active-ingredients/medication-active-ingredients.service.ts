import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER } from '../../server/db/database.module';
import type { DrizzleClient } from '../../server/db/database.module';
import {
  medicationActiveIngredients,
  medications,
} from '../../server/db/schema';
import type { InferInsertModel } from 'drizzle-orm';
import { CreateMedicationActiveIngredientsDto } from './dto/create-medication-active-ingredients.dto';
import { UpdateMedicationActiveIngredientsDto } from './dto/update-medication-active-ingredients.dto';

type MedicationActiveIngredientsInsert = InferInsertModel<
  typeof medicationActiveIngredients
>;

@Injectable()
export class MedicationActiveIngredientsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}

  private async verifyMedicationBelongsToHousehold(
    householdId: string,
    medicationId: string,
  ) {
    const [medication] = await this.db
      .select({ id: medications.id })
      .from(medications)
      .where(
        and(
          eq(medications.id, medicationId),
          eq(medications.householdId, householdId),
        ),
      );

    if (!medication) {
      throw new NotFoundException(
        `No existe el medicamento ${medicationId} en el hogar ${householdId}`,
      );
    }
  }

  async create(
    householdId: string,
    medicationId: string,
    createDto: CreateMedicationActiveIngredientsDto,
  ) {
    await this.verifyMedicationBelongsToHousehold(householdId, medicationId);

    const [newIngredient] = await this.db
      .insert(medicationActiveIngredients)
      .values({
        ...(createDto as unknown as MedicationActiveIngredientsInsert),
        medicationId,
      })
      .returning();

    return newIngredient;
  }

  async findAllByMedication(householdId: string, medicationId: string) {
    await this.verifyMedicationBelongsToHousehold(householdId, medicationId);

    return this.db
      .select()
      .from(medicationActiveIngredients)
      .where(eq(medicationActiveIngredients.medicationId, medicationId))
      .orderBy(medicationActiveIngredients.name);
  }

  async findOne(householdId: string, medicationId: string, id: string) {
    await this.verifyMedicationBelongsToHousehold(householdId, medicationId);

    const [ingredient] = await this.db
      .select()
      .from(medicationActiveIngredients)
      .where(
        and(
          eq(medicationActiveIngredients.id, id),
          eq(medicationActiveIngredients.medicationId, medicationId),
        ),
      );

    if (!ingredient) {
      throw new NotFoundException(
        `No existe el principio activo ${id} para el medicamento ${medicationId}`,
      );
    }

    return ingredient;
  }

  async update(
    householdId: string,
    medicationId: string,
    id: string,
    updateDto: UpdateMedicationActiveIngredientsDto,
  ) {
    await this.verifyMedicationBelongsToHousehold(householdId, medicationId);

    const [updatedIngredient] = await this.db
      .update(medicationActiveIngredients)
      .set(updateDto as unknown as Partial<MedicationActiveIngredientsInsert>)
      .where(
        and(
          eq(medicationActiveIngredients.id, id),
          eq(medicationActiveIngredients.medicationId, medicationId),
        ),
      )
      .returning();

    if (!updatedIngredient) {
      throw new NotFoundException(
        `No existe el principio activo ${id} para el medicamento ${medicationId}`,
      );
    }

    return updatedIngredient;
  }

  async remove(householdId: string, medicationId: string, id: string) {
    await this.verifyMedicationBelongsToHousehold(householdId, medicationId);

    const [removedIngredient] = await this.db
      .delete(medicationActiveIngredients)
      .where(
        and(
          eq(medicationActiveIngredients.id, id),
          eq(medicationActiveIngredients.medicationId, medicationId),
        ),
      )
      .returning();

    if (!removedIngredient) {
      throw new NotFoundException(
        `No existe el principio activo ${id} para el medicamento ${medicationId}`,
      );
    }

    return removedIngredient;
  }
}
