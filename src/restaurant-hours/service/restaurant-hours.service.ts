import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';

@Injectable()
export class RestaurantHoursService {
    constructor(private readonly prisma: PrismaService) {}

  // Get restaurant hours for a specific date
  async getRestaurantHoursForDate(date: Date) {
    const dayOfWeek = date.toLocaleString('en-us', { weekday: 'long' }); // Get the day of the week
    return this.prisma.restaurantHours.findFirst({
      where: { day: dayOfWeek },
    });
  }

  async findAll() {
    return this.prisma.restaurantHours.findMany();
  }
}
