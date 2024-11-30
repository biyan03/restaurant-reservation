import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantHoursService } from './restaurant-hours.service';

describe('RestaurantHoursService', () => {
  let service: RestaurantHoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantHoursService],
    }).compile();

    service = module.get<RestaurantHoursService>(RestaurantHoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
