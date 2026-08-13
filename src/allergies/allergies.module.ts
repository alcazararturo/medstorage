import { Module } from '@nestjs/common';
import { AllergiesService } from './allergies.service';
import { AllergiesController } from './allergies.controller';
import { DatabaseModule } from '../../server/db/database.module';
import { HouseholdUsersModule } from '../household-users/household-users.module';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';

@Module({
  imports: [DatabaseModule, HouseholdUsersModule],
  controllers: [AllergiesController],
  providers: [AllergiesService, HouseholdMemberGuard],
  exports: [AllergiesService],
})
export class AllergiesModule {}
