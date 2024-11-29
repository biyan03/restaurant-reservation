import { Module } from '@nestjs/common';
import { ReservationController } from '../controller/reservation.controller';
import { PrismaService } from '../../prisma/service/prisma.service';
import { ReservationService } from '../service/reservation.service';

@Module({
  controllers: [ReservationController],
  providers:[ReservationService,PrismaService]
})
export class ReservationModule {}
