import { Module } from '@nestjs/common';
import { MedicationActiveIngredientsService } from './medication-active-ingredients.service';
import { MedicationActiveIngredientsController } from './medication-active-ingredients.controller';
import { DatabaseModule } from '../../server/db/database.module';
import { HouseholdUsersModule } from '../household-users/household-users.module';
import { MedicationsModule } from '../medications/medications.module';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';

@Module({
  imports: [DatabaseModule, HouseholdUsersModule, MedicationsModule],
  controllers: [MedicationActiveIngredientsController],
  providers: [MedicationActiveIngredientsService, HouseholdMemberGuard],
  exports: [MedicationActiveIngredientsService],
})
export class MedicationActiveIngredientsModule {}
