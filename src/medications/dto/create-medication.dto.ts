import { createInsertSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { medications } from '../../../server/db/schema';

const MedicationsBaseSchema = createInsertSchema(medications);

export const MedicationsSchema = MedicationsBaseSchema.omit({
  id: true,
  householdId: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  brandName: z
    .string()
    .trim()
    .min(2, 'El nombre comercial debe tener al menos 2 caracteres')
    .max(255, 'El nombre comercial no puede exceder 255 caracteres'),
  genericName: z.string().trim().max(255).optional().nullable(),
  pharmaceuticalForm: z.string().trim().max(100).optional().nullable(),
  concentration: z.string().trim().max(100).optional().nullable(),
  presentation: z.string().trim().max(150).optional().nullable(),
  barcode: z.string().trim().max(100).optional().nullable(),
  imageUrl: z
    .string()
    .trim()
    .url('Debe ser una URL válida')
    .optional()
    .nullable(),
  informationSourceUrl: z
    .string()
    .trim()
    .url('Debe ser una URL válida')
    .optional()
    .nullable(),
  notes: z.string().trim().max(1000).optional().nullable(),
});

export class CreateMedicationDto extends createZodDto(MedicationsSchema) {}
