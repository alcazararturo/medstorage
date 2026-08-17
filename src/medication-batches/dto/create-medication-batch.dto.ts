import { createInsertSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { medicationBatches } from '../../../server/db/schema';

const decimalRegex = /^\d{1,8}(\.\d{1,2})?$/;

const MedicationBatchesBaseSchema = createInsertSchema(medicationBatches);

export const MedicationBatchSchema = MedicationBatchesBaseSchema.omit({
  id: true,
  medicationId: true,
  storageLocationId: true,
  createdAt: true,
}).extend({
  lotNumber: z.string().trim().max(100).optional().nullable(),
  expirationDate: z
    .string()
    .regex(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      'Debe ser formato YYYY-MM-DD',
    ),
  quantity: z
    .string()
    .regex(
      decimalRegex,
      'Debe ser un número decimal válido (máx. 8 enteros y 2 decimales)',
    )
    .default('0.00'),
  unit: z.string().trim().max(50).nonempty(),
  openedAt: z
    .string()
    .regex(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      'Debe ser formato YYYY-MM-DD',
    )
    .optional()
    .nullable(),
  notes: z.string().trim().max(1000).optional().nullable(),
});

export class CreateMedicationBatchDto extends createZodDto(
  MedicationBatchSchema,
) {}
