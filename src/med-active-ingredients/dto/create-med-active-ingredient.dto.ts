import { createInsertSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
// import { z } from 'zod';
import { medicationActiveIngredients } from '../../../server/db/schema';

export const MedActiveIngredientsSchema = createInsertSchema(
  medicationActiveIngredients,
);

export class CreateMedActiveIngredientDto extends createZodDto(
  MedActiveIngredientsSchema,
) {}
