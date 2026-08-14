import { Module } from '@nestjs/common';
import { MedicationActiveIngredientsService } from './medication-active-ingredients.service';
import { MedicationActiveIngredientsController } from './medication-active-ingredients.controller';

@Module({
  controllers: [MedicationActiveIngredientsController],
  providers: [MedicationActiveIngredientsService],
})
export class MedicationActiveIngredientsModule {}
