import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(customerId: number, tableId: number, reservationDate: Date) {
    return this.prisma.$transaction(async (tx) => {
      const existingReservation = await tx.reservation.findFirst({
        where: {
          tableId,
          reservationDate,
        },
      });

      if (existingReservation) {
        throw new Error('Table is already booked for the specified date.');
      }

      return tx.reservation.create({
        data: {
          reservationDate,
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
