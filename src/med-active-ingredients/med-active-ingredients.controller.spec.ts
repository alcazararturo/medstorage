import { Test, TestingModule } from '@nestjs/testing';
import { MedActiveIngredientsController } from './med-active-ingredients.controller';
import { MedActiveIngredientsService } from './med-active-ingredients.service';

describe('MedActiveIngredientsController', () => {
  let controller: MedActiveIngredientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedActiveIngredientsController],
      providers: [MedActiveIngredientsService],
    }).compile();

    controller = module.get<MedActiveIngredientsController>(MedActiveIngredientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
