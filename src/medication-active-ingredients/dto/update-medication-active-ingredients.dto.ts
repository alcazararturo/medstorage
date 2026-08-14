import { createZodDto } from 'nestjs-zod';
import { MedicationActiveIngredientsSchema } from './create-medication-active-ingredients.dto';

export class UpdateMedicationActiveIngredientsDto extends createZodDto(
  MedicationActiveIngredientsSchema.partial(),
) {}
