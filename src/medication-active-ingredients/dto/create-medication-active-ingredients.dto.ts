import { createInsertSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { medicationActiveIngredients } from '../../../server/db/schema';

const MedicationActiveIngredientsBaseSchema = createInsertSchema(
  medicationActiveIngredients,
);

export const MedicationActiveIngredientsSchema =
  MedicationActiveIngredientsBaseSchema.omit({
    id: true,
    medicationId: true,
    createdAt: true,
  }).extend({
    name: z
      .string()
      .trim()
      .min(2, 'El nombre del principio activo debe tener al menos 2 caracteres')
      .max(255, 'El nombre no puede exceder 255 caracteres'),
  });

export class CreateMedicationActiveIngredientsDto extends createZodDto(
  MedicationActiveIngredientsSchema,
) {}
