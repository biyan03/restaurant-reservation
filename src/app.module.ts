import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/module/customer.module';
import { TableModule } from './table/module/table.module';
import { ReservationModule } from './reservation/module/reservation.module';
import { RestaurantHoursModule } from './restaurant-hours/module/restaurant-hours.module';

@Module({
  imports: [CustomerModule, TableModule, ReservationModule,RestaurantHoursModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
