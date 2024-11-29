import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/module/customer.module';
import { TableModule } from './table/module/table.module';
import { ReservationModule } from './reservation/module/reservation.module';

@Module({
  imports: [CustomerModule, TableModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
