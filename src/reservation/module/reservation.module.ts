import { Module } from '@nestjs/common';
import { ReservationController } from '../controller/reservation.controller';
import { PrismaService } from '../../prisma/service/prisma.service';
import { ReservationService } from '../service/reservation.service';
import { RestaurantHoursService } from '../../restaurant-hours/service/restaurant-hours.service';
import { EmailService } from '../../email/email.service';
import { CustomerService } from '../../customer/service/customer.service';

@Module({
  controllers: [ReservationController],
  providers: [
    ReservationService,
    PrismaService,
    RestaurantHoursService,
    EmailService,
    CustomerService,
  ],
})
export class ReservationModule {}
