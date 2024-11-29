import { Module } from '@nestjs/common';
import { TableService } from '../service/table.service';
import { PrismaService } from '../../prisma/service/prisma.service';
import { TableController } from '../controller/table.controller';

@Module({
  controllers: [TableController],
  providers: [TableService,PrismaService]
})
export class TableModule {}
