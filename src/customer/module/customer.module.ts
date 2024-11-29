import { Module } from '@nestjs/common';

import { CustomerService } from '../service/customer.service';
import { CustomerController } from '../controller/customer.controller';
import { PrismaService } from '../../prisma/service/prisma.service';

@Module({
    controllers: [CustomerController],
    providers: [CustomerService,PrismaService],})
export class CustomerModule {}
