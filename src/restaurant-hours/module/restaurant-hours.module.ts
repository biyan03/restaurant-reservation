import { Module } from '@nestjs/common';
import { RestaurantHoursService } from '../service/restaurant-hours.service';
import { PrismaService } from '../../prisma/service/prisma.service';
import { RestaurantHoursController } from '../controller/restaurant-hours.controller';

@Module({
    controllers:[RestaurantHoursController],
    providers:[RestaurantHoursService,PrismaService]
  })
export class RestaurantHoursModule {}
