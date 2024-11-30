import { Module } from '@nestjs/common';

import { CustomerService } from '../service/customer.service';
import { CustomerController } from '../controller/customer.controller';
import { PrismaService } from '../../prisma/service/prisma.service';
import { EmailService } from 'src/email/email.service';

@Module({
    controllers: [CustomerController],
    providers: [CustomerService,PrismaService,EmailService],})
export class CustomerModule {}
