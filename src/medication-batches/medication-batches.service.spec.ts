import { Test, TestingModule } from '@nestjs/testing';
import { MedicationBatchesService } from './medication-batches.service';

describe('MedicationBatchesService', () => {
  let service: MedicationBatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicationBatchesService],
    }).compile();

    service = module.get<MedicationBatchesService>(MedicationBatchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
