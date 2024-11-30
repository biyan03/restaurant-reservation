import { Controller, Get } from '@nestjs/common';
import { RestaurantHoursService } from '../service/restaurant-hours.service';
import { PrismaService } from '../..//prisma/service/prisma.service';

@Controller('restaurant-hours')
export class RestaurantHoursController {
    constructor(
        private readonly restaurantHours:RestaurantHoursService,
        private readonly prisma: PrismaService
    ){}

    @Get('generate-restaurant-hours')
    async initializeRestaurantHours() {
        const daysOfWeek = [
          { day: 'Monday', openTime: '2024-11-29T09:00:00Z', closeTime: '2024-11-29T18:00:00Z' },
          { day: 'Tuesday', openTime: '2024-11-30T09:00:00Z', closeTime: '2024-11-30T18:00:00Z' },
          { day: 'Wednesday', openTime: '2024-12-01T09:00:00Z', closeTime: '2024-12-01T18:00:00Z' },
          { day: 'Thursday', openTime: '2024-12-02T09:00:00Z', closeTime: '2024-12-02T18:00:00Z' },
          { day: 'Friday', openTime: '2024-12-03T09:00:00Z', closeTime: '2024-12-03T18:00:00Z' },
          { day: 'Saturday', openTime: '2024-12-04T10:00:00Z', closeTime: '2024-12-04T22:00:00Z' },
          { day: 'Sunday', openTime: '2024-12-05T10:00:00Z', closeTime: '2024-12-05T22:00:00Z' },
        ];
    
        const getInitData = this.restaurantHours.findAll();
        const countData= (await getInitData).length;
        if(countData==0){
            await Promise.all(
                daysOfWeek.map((day) =>
                  this.prisma.restaurantHours.create({
                    data: {
                      day: day.day,
                      openTime: new Date(day.openTime),
                      closeTime: new Date(day.closeTime),
                    },
                  }),
                ),
              );        
              return 'Success Generate Restaurant Hours'
        }else{
            return 'Data are avaialble '
        }
      }
}
