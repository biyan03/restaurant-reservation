import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { TableService } from '../service/table.service';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  create(@Body() data) {
    return this.tableService.create(data);
  }

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data) {
    return this.tableService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tableService.delete(id);
  }
}