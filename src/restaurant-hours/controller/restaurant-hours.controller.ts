import { Controller, Get } from '@nestjs/common';
import { RestaurantHoursService } from '../service/restaurant-hours.service';
import { PrismaService } from '../..//prisma/service/prisma.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Restaurant Hours')
@Controller('restaurant-hours')
export class RestaurantHoursController {
    constructor(
        private readonly restaurantHours:RestaurantHoursService,
        private readonly prisma: PrismaService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all open and close Restaurant' })
    @ApiResponse({
      status: 200,
      description: 'Success Get All Restaurant Hours.',
    })
    findAll(){
      return this.restaurantHours.findAll();
    }

    @Get('generate-restaurant-hours')
    @ApiOperation({ summary: 'Generate Default hour open and close Restaurant' })
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
