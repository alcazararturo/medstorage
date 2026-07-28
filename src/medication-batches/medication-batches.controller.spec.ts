import { Test, TestingModule } from '@nestjs/testing';
import { MedicationBatchesController } from './medication-batches.controller';
import { MedicationBatchesService } from './medication-batches.service';

describe('MedicationBatchesController', () => {
  let controller: MedicationBatchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicationBatchesController],
      providers: [MedicationBatchesService],
    }).compile();

    controller = module.get<MedicationBatchesController>(MedicationBatchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
