import { createInsertSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
// import { z } from 'zod';
import { householdUsers } from '../../../server/db/schema';

export const HouseholdUsersSchema = createInsertSchema(householdUsers);

export class CreateHouseholdUserDto extends createZodDto(
  HouseholdUsersSchema,
) {}
