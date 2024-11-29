import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TableCreateInput) {
    try {
      return this.prisma.table.create({ data });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Bad Request');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.table.findMany();
  }

  async update(id: number, data: Prisma.TableUpdateInput) {
    return this.prisma.table.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.table.delete({ where: { id } });
  }
}
