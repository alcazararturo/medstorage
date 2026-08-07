import { Module } from '@nestjs/common';
import { HouseholdUsersService } from './household-users.service';
import { HouseholdUsersController } from './household-users.controller';
import { DatabaseModule } from '../../server/db/database.module';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [HouseholdUsersController],
  providers: [HouseholdUsersService, HouseholdMemberGuard],
  exports: [HouseholdUsersService],
})
export class HouseholdUsersModule {}
