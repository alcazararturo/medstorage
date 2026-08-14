import { createInsertSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
// import { z } from 'zod';
import { medicationActiveIngredients } from '../../../server/db/schema';

export const MedicationActiveIngredientsSchema = createInsertSchema(
  medicationActiveIngredients,
);

export class CreateMedicationActiveIngredientsDto extends createZodDto(
  MedicationActiveIngredientsSchema,
) {}
