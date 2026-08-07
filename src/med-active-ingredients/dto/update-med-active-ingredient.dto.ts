import { createZodDto } from 'nestjs-zod';
import { MedActiveIngredientsSchema } from './create-med-active-ingredient.dto';

export class UpdateMedActiveIngredientDto extends createZodDto(
  MedActiveIngredientsSchema.partial(),
) {}
