import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/module/customer.module';
import { TableModule } from './table/module/table.module';
import { ReservationModule } from './reservation/module/reservation.module';
import { RestaurantHoursModule } from './restaurant-hours/module/restaurant-hours.module';
import { EmailService } from './email/email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CustomerModule,
    TableModule,
    ReservationModule,
    RestaurantHoursModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config accessible globally
      envFilePath: '.env', // Path to the .env file
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
