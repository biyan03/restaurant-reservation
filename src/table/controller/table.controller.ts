import { Controller, Post, Get, Patch, Delete, Body, Param, BadRequestException } from '@nestjs/common';
import { TableService } from '../service/table.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateTableDto } from '../dtos/create-table.dto';
import { UpdateTableDto } from '../dtos/update-table.dto';

@ApiTags('Table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  create(@Body() data:CreateTableDto) {
    try {
      return this.tableService.create(data);
    } catch (error) {
      throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data:UpdateTableDto) {
    return this.tableService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tableService.delete(id);
  }
}