import { createInsertSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { medicationBatches } from '../../../server/db/schema'; // Modifica la ruta según tu proyecto

const BaseInsertBatchSchema = createInsertSchema(medicationBatches);

export const RefinedBatchSchema = BaseInsertBatchSchema.extend({
  quantity: z.number().positive(),

  expirationDate: z
    .string()
    .regex(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      'Debe ser formato YYYY-MM-DD',
    ),
  openedAt: z
    .string()
    .regex(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      'Debe ser formato YYYY-MM-DD',
    )
    .optional()
    .nullable(),
});

export class CreateMedicationBatchDto extends createZodDto(
  RefinedBatchSchema,
) {}
