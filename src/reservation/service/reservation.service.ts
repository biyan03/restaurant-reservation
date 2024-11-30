import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { Prisma } from '@prisma/client';
import { RestaurantHoursService } from '../../restaurant-hours/service/restaurant-hours.service';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService,
    private readonly restaurantHoursService: RestaurantHoursService
  ) {}

  async create(customerId: number, tableId: number, reservedAt: Date) {
    const restaurantHours = await this.restaurantHoursService.getRestaurantHoursForDate(reservedAt);
    console.log(restaurantHours)
    
    if (!restaurantHours) {
      throw new BadRequestException('The restaurant is closed on this day.');
    }
    
    return this.prisma.$transaction(async (tx) => {
      const existingReservation = await tx.reservation.findFirst({
        where: {
          tableId,
          reservedAt,
        },
      });

      if (existingReservation) {
        throw new Error('Table is already booked for the specified date.');
      }

      return tx.reservation.create({
        data: {
          reservedAt,
          customer: { connect: { id: customerId } },
          table: { connect: { id: tableId } },
        },
      });
    });
  }

  async findAll() {
    return this.prisma.reservation.findMany({
      include: { customer: true, table: true },
    });
  }
}
