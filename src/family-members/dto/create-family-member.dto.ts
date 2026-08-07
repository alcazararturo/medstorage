import { createInsertSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { familyMembers } from '../../../server/db/schema';

const FamilyMembersSchema = createInsertSchema(familyMembers);

export const RefinedMembersSchema = FamilyMembersSchema.extend({
  birthDate: z
    .string()
    .regex(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      'Debe ser formato YYYY-MM-DD',
    ),
});

export class CreateFamilyMemberDto extends createZodDto(RefinedMembersSchema) {}
