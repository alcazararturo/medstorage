import { createZodDto } from 'nestjs-zod';
import { HouseholdsSchema } from './create-household.dto';

export class UpdateHouseholdDto extends createZodDto(
  HouseholdsSchema.partial(),
) {}
