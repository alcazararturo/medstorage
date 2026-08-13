import { createInsertSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { allergies } from '../../../server/db/schema';

export const AllergiesBaseSchema = createInsertSchema(allergies);

export const AllergiesSchema = AllergiesBaseSchema.omit({
  id: true,
  familyMemberId: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  allergenName: z
    .string()
    .trim()
    .min(2, 'El nombre del alérgeno debe tener al menos 2 caracteres')
    .max(200, 'El nombre del alérgeno no puede exceder 200 caracteres'),
  notes: z.string().trim().max(1000).optional().nullable(),
});

export class CreateAllergyDto extends createZodDto(AllergiesSchema) {}
