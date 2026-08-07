import { createInsertSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
// import { z } from 'zod';
import { households } from '../../../server/db/schema';

export const HouseholdsSchema = createInsertSchema(households);

export class CreateHouseholdDto extends createZodDto(HouseholdsSchema) {}
