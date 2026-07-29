import { Test, TestingModule } from '@nestjs/testing';
import { HouseholdUsersService } from './household-users.service';

describe('HouseholdUsersService', () => {
  let service: HouseholdUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseholdUsersService],
    }).compile();

    service = module.get<HouseholdUsersService>(HouseholdUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
