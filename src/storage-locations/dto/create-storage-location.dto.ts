import { createInsertSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { storageLocations } from '../../../server/db/schema';

const StorageLocationsBaseSchema = createInsertSchema(storageLocations);

export const StorageLocationsSchema = StorageLocationsBaseSchema.omit({
  id: true,
  householdId: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(150, 'El nombre no puede exceder 150 caracteres'),
  description: z.string().trim().max(1000).optional().nullable(),
});

export class CreateStorageLocationDto extends createZodDto(
  StorageLocationsSchema,
) {}
