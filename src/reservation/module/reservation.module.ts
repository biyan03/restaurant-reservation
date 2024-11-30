import { Module } from '@nestjs/common';
import { ReservationController } from '../controller/reservation.controller';
import { PrismaService } from '../../prisma/service/prisma.service';
import { ReservationService } from '../service/reservation.service';
import { RestaurantHoursService } from '../../restaurant-hours/service/restaurant-hours.service';

@Module({
  controllers: [ReservationController],
  providers:[ReservationService,PrismaService,RestaurantHoursService]
})
export class ReservationModule {}
