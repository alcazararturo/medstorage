import { createZodDto } from 'nestjs-zod';
import { RefinedMembersSchema } from './create-family-member.dto';

export class UpdateFamilyMemberDto extends createZodDto(
  RefinedMembersSchema.partial(),
) {}
