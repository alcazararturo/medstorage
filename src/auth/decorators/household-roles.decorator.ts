import { SetMetadata } from '@nestjs/common';

export const HOUSEHOLD_ROLES_KEY = 'householdRoles';

export type HouseholdRole = 'owner' | 'member';

export const HouseholdRoles = (...roles: HouseholdRole[]) =>
  SetMetadata(HOUSEHOLD_ROLES_KEY, roles);
