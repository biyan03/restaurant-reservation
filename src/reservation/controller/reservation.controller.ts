import { Controller, Post, Get, Body } from '@nestjs/common';
import { ReservationService } from '../service/reservation.service';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Reservation } from '@prisma/client';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a reservation' })
  @ApiBody({
    description: 'The reservation details',
    type: CreateReservationDto, // DTO used for creating a reservation
  })
  @ApiResponse({
    status: 201,
    description: 'The reservation has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation failed or overlapping reservations.',
  })
  create(@Body() data: CreateReservationDto) {
    return this.reservationService.create(data);

  }

  @Get()
  @ApiOperation({ summary: 'Get all reservation' })
  @ApiResponse({
    status: 200,
    description: 'Success Get All reservation.',
  })
  findAll() {
    return this.reservationService.findAll();
  }
}