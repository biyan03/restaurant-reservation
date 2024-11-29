import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/service/prisma.service';

@Injectable()
export class CustomerService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: Prisma.CustomerCreateInput) {
      return this.prisma.customer.create({ data });
    }
  
    async get() {
      return this.prisma.customer.findMany();
    }
    async findAll() {
      return this.prisma.customer.findMany();
    }
  
    async update(id: number, data: Prisma.CustomerUpdateInput) {
      console.log('ID type:', typeof id, 'ID value:', id);
      return this.prisma.customer.update({
        where: { id },
        data,
      });
    }
  
    async delete(id: number) {
      return this.prisma.customer.delete({ where: { id } });
    }
}
