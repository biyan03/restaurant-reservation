import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { Prisma } from '@prisma/client';
import { RestaurantHoursService } from '../../restaurant-hours/service/restaurant-hours.service';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { console } from 'inspector';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService,
    private readonly restaurantHoursService: RestaurantHoursService,
    private readonly emailService: EmailService
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const { customerId, tableId, reservedAt, reservedTime, duration } = createReservationDto;

    // Combine the date and time into a full DateTime object
    const reservedDate = new Date(reservedAt);
    const [hours, minutes] = reservedTime.split(':').map((timePart) => parseInt(timePart, 10));

    //check back date
    if(reservedDate< new Date()){
      throw new BadRequestException('The reservation date has passed, please select the next date.');
    }

    // Set the hour and minute of the reservation date
    reservedDate.setHours(hours, minutes, 0, 0);

    const restaurantHours = await this.restaurantHoursService.getRestaurantHoursForDate(new Date(reservedAt));

    if (!restaurantHours) {
      throw new BadRequestException('The restaurant is closed on this day.');
    }

    //restorant open time;
    const restorantOpen = new Date(reservedAt);
    const [openHours, openMinutes] = restaurantHours.openTime.split(':').map((timePart) => parseInt(timePart, 10));
    restorantOpen.setHours(openHours, openMinutes, 0, 0);

    //restorant close time;
    const restorantClose = new Date(reservedAt);
    restorantClose.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    const [closeHours, closeMinutes] = restaurantHours.closeTime.split(':').map((timePart) => parseInt(timePart, 10));
    restorantClose.setHours(closeHours, closeMinutes, 0, 0);
    
    
    // Check if the reservation time in opening and closing time restaurant

    if (reservedDate < restorantOpen || reservedDate > restorantClose) {
      throw new BadRequestException("The reservation time is outside of the restaurant's operating hours.");
    }

    // Calculate the end time of the reservation by adding the duration
    const reservedEndDate = new Date(reservedDate);
    reservedEndDate.setHours(reservedEndDate.getHours() + duration);

     // Check if the reservation time slot overlaps with an existing reservation
     const overlappingReservation = await this.prisma.reservation.findFirst({      
      where: {
        tableId,
        OR: [
          // Check if the reserved time overlaps with any existing reservation
          {
            reservedAt: {
              lt: reservedDate, 
            },
            reservedEnd: {
              gt: reservedDate, 
            },
          },
          {
            reservedAt: {
              lt: reservedEndDate, 
            },
            reservedEnd: {
              gt: reservedEndDate, 
            },
          }
        ],
      },
    });
    
    if (overlappingReservation) {
      throw new BadRequestException('The time slot is already booked.');
    }
    
    const reservation = this.prisma.$transaction(async (tx) => {
      return tx.reservation.create({
        data: {
          reservedAt: reservedDate,
          reservedEnd: reservedEndDate,
          status: true,
          customerId: customerId,
          tableId: tableId,
        },
      });
    });

    // Get the customer
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });
    if(customer){
      // Send email to the customer
      const subject = `Reservation Confirmed: ${reservedDate.toLocaleString()}`;
      const text = `Your reservation at our restaurant has been successfully confirmed! 
      Reservation Details:
      - Table: ${tableId}
      - Date: ${reservedDate.toLocaleDateString()}
      - Time: ${reservedDate.toLocaleTimeString()}
      - Duration: ${duration} hour(s)`;

      const html = `
        <h2>Reservation Confirmation</h2>
        <p>Your reservation at our restaurant has been successfully confirmed!</p>
        <ul>
          <li><strong>Table:</strong> ${tableId}</li>
          <li><strong>Date:</strong> ${reservedDate.toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${reservedDate.toLocaleTimeString()}</li>
          <li><strong>Duration:</strong> ${duration} hour(s)</li>
        </ul>
        <p>We look forward to serving you!</p>
      `;

      await this.emailService.sendReservationEmail(
        customer.email,
        subject,
        text,
        html,
      );
    }
    return reservation;

  }

  async findAll() {
    return this.prisma.reservation.findMany({
      include: { customer: true, table: true },
    });
  }
}
