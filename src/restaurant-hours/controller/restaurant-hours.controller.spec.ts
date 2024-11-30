import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantHoursController } from './restaurant-hours.controller';

describe('RestaurantHoursController', () => {
  let controller: RestaurantHoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantHoursController],
    }).compile();

    controller = module.get<RestaurantHoursController>(RestaurantHoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
