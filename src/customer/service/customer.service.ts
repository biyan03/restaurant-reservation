import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/service/prisma.service';

@Injectable()
export class CustomerService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: Prisma.CustomerCreateInput) {
      try {
        return await this.prisma.customer.create({ data });
      } catch (error) {
        
        throw error;
      }
    }
  
    async get() {
      return this.prisma.customer.findMany();
    }
    async findAll() {
      return this.prisma.customer.findMany();
    }
  
    async update(id: number, data: Prisma.CustomerUpdateInput) {
      return this.prisma.customer.update({
        where: { id },
        data,
      });
    }
  
    async delete(id: number) {
      try {
        return await this.prisma.customer.delete({ where: { id } });
      } catch (error) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Data not be found');
        }
        throw error;
      }
    }
}
