import { createZodDto } from 'nestjs-zod';
import { RefinedBatchSchema } from './create-medication-batch.dto';

export class UpdateMedicationBatchDto extends createZodDto(
  RefinedBatchSchema.partial(),
) {}
