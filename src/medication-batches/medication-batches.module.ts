import { Module } from '@nestjs/common';
import { MedicationBatchesService } from './medication-batches.service';
import { MedicationBatchesController } from './medication-batches.controller';

@Module({
  controllers: [MedicationBatchesController],
  providers: [MedicationBatchesService],
})
export class MedicationBatchesModule {}
