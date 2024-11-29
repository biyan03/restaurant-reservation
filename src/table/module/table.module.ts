import { Module } from '@nestjs/common';
import { TableService } from '../service/table.service';
import { PrismaService } from '../../prisma/service/prisma.service';

@Module({
  providers: [TableService,PrismaService]
})
export class TableModule {}
