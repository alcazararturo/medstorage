import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseholdUserDto } from './create-household-user.dto';

export class UpdateHouseholdUserDto extends PartialType(CreateHouseholdUserDto) {}
