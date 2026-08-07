import { Module } from '@nestjs/common';
import { HouseholdsService } from './households.service';
import { HouseholdsController } from './households.controller';
import { HouseholdUsersModule } from '../household-users/household-users.module';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';

@Module({
  imports: [HouseholdUsersModule],
  controllers: [HouseholdsController],
  providers: [HouseholdsService, HouseholdMemberGuard],
  exports: [HouseholdsService],
})
export class HouseholdsModule {}
