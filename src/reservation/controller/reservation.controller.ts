import { Controller, Post, Get, Body } from '@nestjs/common';
import { ReservationService } from '../service/reservation.service';
import { CreateReservationDto } from '../dto/create-reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() data: CreateReservationDto) {
    return this.reservationService.create(data.customerId, data.tableId, new Date(data.reservedAt));

  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }
}