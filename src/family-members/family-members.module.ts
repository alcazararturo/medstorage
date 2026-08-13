import { Module } from '@nestjs/common';
import { FamilyMembersService } from './family-members.service';
import { FamilyMembersController } from './family-members.controller';
import { DatabaseModule } from '../../server/db/database.module';
import { HouseholdUsersModule } from '../household-users/household-users.module';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';

@Module({
  imports: [DatabaseModule, HouseholdUsersModule],
  controllers: [FamilyMembersController],
  providers: [FamilyMembersService, HouseholdMemberGuard],
  exports: [FamilyMembersService],
})
export class FamilyMembersModule {}
