import { createInsertSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { familyMembers } from '../../../server/db/schema';

const FamilyMembersSchema = createInsertSchema(familyMembers);

export const RefinedMembersSchema = FamilyMembersSchema.omit({
  householdId: true,
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  fulName: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(150, 'El nombre no puede exceder de 150 caracteres'),
  birthDate: z
    .string()
    .regex(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      'Debe ser formato YYYY-MM-DD',
    )
    .optional()
    .nullable(),
  notes: z.string().trim().max(1000).optional().nullable(),
});

export class CreateFamilyMemberDto extends createZodDto(RefinedMembersSchema) {}
