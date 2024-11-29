import { Controller, Post, Get, Body } from '@nestjs/common';
import { ReservationService } from '../service/reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() data: { customerId: number; tableId: number; reservationDate: Date }) {
    return this.reservationService.create(data.customerId, data.tableId, new Date(data.reservationDate));
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }
}