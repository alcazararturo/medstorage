import { createZodDto } from 'nestjs-zod';
import { MedicationBatchSchema } from './create-medication-batch.dto';

export class UpdateMedicationBatchDto extends createZodDto(
  MedicationBatchSchema.partial(),
) {}
