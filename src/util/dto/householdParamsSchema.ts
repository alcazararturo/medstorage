import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const HouseholdParamsSchema = z.object({
  householdId: z.string().uuid(),
});

export class HouseholdParamsDto extends createZodDto(HouseholdParamsSchema) {}
