import { Controller, Post, Get, Patch, Delete, Body, Param, BadRequestException } from '@nestjs/common';
import { TableService } from '../service/table.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateTableDto } from '../dtos/create-table.dto';
import { UpdateTableDto } from '../dtos/update-table.dto';

@ApiTags('Table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @ApiOperation({ summary: 'Create Table of restaurant' })
  @ApiResponse({
    status: 201,
    description: 'Table has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation failed.',
  })
  create(@Body() data:CreateTableDto) {
    try {
      return this.tableService.create(data);
    } catch (error) {
      throw new BadRequestException(error.message);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all table of restaurant' })
  @ApiResponse({
    status: 200,
    description: 'Success get all table of restaurant.',
  })
  findAll() {
    return this.tableService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Table of restaurant' })
  @ApiResponse({
    status: 200,
    description: 'Success update table of restaurant.',
  })
  update(@Param('id') id: number, @Body() data:UpdateTableDto) {
    return this.tableService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Table of restaurant' })
  @ApiResponse({
    status: 200,
    description: 'Success delete table of restaurant.',
  })
  remove(@Param('id') id: number) {
    return this.tableService.delete(id);
  }
}