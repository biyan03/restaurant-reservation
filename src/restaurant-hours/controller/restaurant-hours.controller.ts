import { Controller, Get } from '@nestjs/common';
import { RestaurantHoursService } from '../service/restaurant-hours.service';
import { PrismaService } from '../..//prisma/service/prisma.service';

@Controller('restaurant-hours')
export class RestaurantHoursController {
    constructor(
        private readonly restaurantHours:RestaurantHoursService,
        private readonly prisma: PrismaService
    ){}

    @Get()
    findAll(){
      return this.restaurantHours.findAll();
    }

    @Get('generate-restaurant-hours')
    async initializeRestaurantHours() {
        const daysOfWeek = [
          { day: 'Monday', openTime: '09:00', closeTime: '21:00' },
          { day: 'Tuesday', openTime: '09:00', closeTime: '21:00' },
          { day: 'Wednesday', openTime: '09:00', closeTime: '21:00' },
          { day: 'Thursday', openTime: '09:00', closeTime: '21:00' },
          { day: 'Friday', openTime: '09:00', closeTime: '21:00' },
          { day: 'Saturday', openTime: '10:00', closeTime: '22:00' },
          { day: 'Sunday', openTime: '10:00', closeTime: '22:00' },
        ];
    
        const getInitData = this.restaurantHours.findAll();
        const countData= (await getInitData).length;
        if(countData==0){
          console.log(daysOfWeek);
          
            await Promise.all(
                daysOfWeek.map((day) =>
                  this.prisma.restaurantHours.create({
                    data: {
                      day: day.day,
                      openTime: day.openTime,
                      closeTime: day.closeTime,
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
