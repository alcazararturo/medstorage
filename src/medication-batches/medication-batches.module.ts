import { Module } from '@nestjs/common';
import { MedicationBatchesService } from './medication-batches.service';
import { MedicationBatchesController } from './medication-batches.controller';
import { DatabaseModule } from '../../server/db/database.module';
import { HouseholdUsersModule } from '../household-users/household-users.module';
import { MedicationsModule } from '../medications/medications.module';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';

@Module({
  imports: [DatabaseModule, HouseholdUsersModule, MedicationsModule],
  controllers: [MedicationBatchesController],
  providers: [MedicationBatchesService, HouseholdMemberGuard],
  exports: [MedicationBatchesService],
})
export class MedicationBatchesModule {}
