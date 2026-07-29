import { Test, TestingModule } from '@nestjs/testing';
import { HouseholdUsersController } from './household-users.controller';
import { HouseholdUsersService } from './household-users.service';

describe('HouseholdUsersController', () => {
  let controller: HouseholdUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseholdUsersController],
      providers: [HouseholdUsersService],
    }).compile();

    controller = module.get<HouseholdUsersController>(HouseholdUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
