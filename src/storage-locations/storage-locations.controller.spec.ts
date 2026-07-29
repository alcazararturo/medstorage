import { Test, TestingModule } from '@nestjs/testing';
import { StorageLocationsController } from './storage-locations.controller';
import { StorageLocationsService } from './storage-locations.service';

describe('StorageLocationsController', () => {
  let controller: StorageLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageLocationsController],
      providers: [StorageLocationsService],
    }).compile();

    controller = module.get<StorageLocationsController>(StorageLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
