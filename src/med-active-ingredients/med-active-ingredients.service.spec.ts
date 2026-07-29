import { Test, TestingModule } from '@nestjs/testing';
import { MedActiveIngredientsService } from './med-active-ingredients.service';

describe('MedActiveIngredientsService', () => {
  let service: MedActiveIngredientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedActiveIngredientsService],
    }).compile();

    service = module.get<MedActiveIngredientsService>(MedActiveIngredientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
