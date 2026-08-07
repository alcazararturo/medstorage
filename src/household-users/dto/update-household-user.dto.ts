import { createZodDto } from 'nestjs-zod';
import { HouseholdUsersSchema } from './create-household-user.dto';

export class UpdateHouseholdUserDto extends createZodDto(
  HouseholdUsersSchema.partial(),
) {}
