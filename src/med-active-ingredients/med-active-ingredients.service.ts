import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER, DrizzleClient } from "../../server/db/database.module";
import { medicationActiveIngredients } from '../../../server/db/schema';
import { CreateMedActiveIngredientDto } from './dto/create-med-active-ingredient.dto';
import { UpdateMedActiveIngredientDto } from './dto/update-med-active-ingredient.dto';

@Injectable()
export class MedActiveIngredientsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient
  )
  async create(createMedActiveIngredientDto: CreateMedActiveIngredientDto) {
    const [newBatch] = await this.db
      .insert(medicationActiveIngredients)
      .values({
        ...createMedActiveIngredientDto,        
      })
      .returning();
    return newBatch;
  }

  async findAll() {
    const [findBatch] = await this.db
    .select()
    .from(medicationActiveIngredients)
    .orderBy(medicationActiveIngredients.medicationId, medicationActiveIngredients.name);
    return findBatch;
  }

  async findOne(id: string) {
    const [findOneBatch] = await this.db
    .select().from(medicationActiveIngredients).where(eq(medicationActiveIngredients.id, id));
    if (!findOneBatch) {
      throw new NotFoundException(`No existe medicationActiveIngredients con id ${id}`,); 
    }
    return findOneBatch;
  }

  async update(id: string, updateMedActiveIngredientDto: UpdateMedActiveIngredientDto) {
    const [updatedBatch] = await this.db
      .update(medicationActiveIngredients)
      .set({
        ...updateMedActiveIngredientDto,        
      })
      .where(eq(medicationActiveIngredients.id, id))
      .returning();
      if (!updatedBatch) {
        throw new NotFoundException(`No existe medicationActiveIngredients con id ${id}`,);
      }
    return updatedBatch;
  }

  async remove(id: string) {
    const [removeBatch] = await this.db.delete(medicationActiveIngredients)
    .where(eq(medicationActiveIngredients.id, id))
    .returning();
    if (!removeBatch) {
      `No existe medicationActiveIngredients con id ${id}`,
    }
    return removeBatch;
  }
}
