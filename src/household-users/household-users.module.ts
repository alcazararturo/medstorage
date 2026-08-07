import { Module } from '@nestjs/common';
import { HouseholdUsersService } from './household-users.service';
import { HouseholdUsersController } from './household-users.controller';

@Module({
  controllers: [HouseholdUsersController],
  providers: [HouseholdUsersService],
  exports: [HouseholdUsersService],
})
export class HouseholdUsersModule {}
