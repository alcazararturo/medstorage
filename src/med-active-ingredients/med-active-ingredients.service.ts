import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER } from '../../server/db/database.module';
import type { DrizzleClient } from '../../server/db/database.module';
import { medicationActiveIngredients } from '../../server/db/schema';
import type { InferInsertModel } from 'drizzle-orm';
import { CreateMedActiveIngredientDto } from './dto/create-med-active-ingredient.dto';
import { UpdateMedActiveIngredientDto } from './dto/update-med-active-ingredient.dto';

type MedicationActiveIngredientsInsert = InferInsertModel<
  typeof medicationActiveIngredients
>;

@Injectable()
export class MedActiveIngredientsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}
  async create(createMedActiveIngredientDto: CreateMedActiveIngredientDto) {
    const [newMedicationActiveIngredients] = await this.db
      .insert(medicationActiveIngredients)
      .values(
        createMedActiveIngredientDto as unknown as MedicationActiveIngredientsInsert,
      )
      .returning();
    return newMedicationActiveIngredients;
  }

  async findAll() {
    return this.db
      .select()
      .from(medicationActiveIngredients)
      .orderBy(
        medicationActiveIngredients.medicationId,
        medicationActiveIngredients.name,
      );
  }

  async findOne(id: string) {
    const [findOneMedicationActiveIngredients] = await this.db
      .select()
      .from(medicationActiveIngredients)
      .where(eq(medicationActiveIngredients.id, id));
    if (!findOneMedicationActiveIngredients) {
      throw new NotFoundException(
        `No existe medicationActiveIngredients con id ${id}`,
      );
    }
    return findOneMedicationActiveIngredients;
  }

  async update(
    id: string,
    updateMedActiveIngredientDto: UpdateMedActiveIngredientDto,
  ) {
    const [updatedMedicationActiveIngredients] = await this.db
      .update(medicationActiveIngredients)
      .set(
        updateMedActiveIngredientDto as unknown as Partial<MedicationActiveIngredientsInsert>,
      ) // cast
      .where(eq(medicationActiveIngredients.id, id))
      .returning();
    if (!updatedMedicationActiveIngredients) {
      throw new NotFoundException(
        `No existe medicationActiveIngredients con id ${id}`,
      );
    }
    return updatedMedicationActiveIngredients;
  }

  async remove(id: string) {
    const [removeMedicationActiveIngredients] = await this.db
      .delete(medicationActiveIngredients)
      .where(eq(medicationActiveIngredients.id, id))
      .returning();
    if (!removeMedicationActiveIngredients) {
      throw new NotFoundException(
        `No existe medicationActiveIngredients con id ${id}`,
      );
    }
    return removeMedicationActiveIngredients;
  }
}
