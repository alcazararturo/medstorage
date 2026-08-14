import { Module } from '@nestjs/common';
import { StorageLocationsService } from './storage-locations.service';
import { StorageLocationsController } from './storage-locations.controller';
import { DatabaseModule } from '../../server/db/database.module';
import { HouseholdUsersModule } from '../household-users/household-users.module';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';

@Module({
  imports: [DatabaseModule, HouseholdUsersModule],
  controllers: [StorageLocationsController],
  providers: [StorageLocationsService, HouseholdMemberGuard],
  exports: [StorageLocationsService],
})
export class StorageLocationsModule {}
