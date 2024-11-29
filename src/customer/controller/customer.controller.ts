import { Controller, Get, Post, Delete, Body, Param, Patch, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { CreateCustomerDto } from '../dtos/create-customer.dto';


@Controller('customer')
export class CustomerController {
    constructor(
        private customerService: CustomerService,
    ) { }

    @Post()
    async create(@Body() data:CreateCustomerDto) {
        try {
            return await this.customerService.create(data);
          } catch (error) {
            throw new BadRequestException(error.message);
            throw error;
          }
    }

    @Get()
    findAll() {
        return this.customerService.findAll();
    }


    @Get(':id')
    findById(@Param('id',ParseIntPipe) id:number) {
      return this.customerService.getById(id);
    }

    @Patch(':id')
    update(@Param('id',ParseIntPipe) id: number, @Body() data) {
        return this.customerService.update(id, data);
    }

    @Delete(':id')
    async remove(@Param('id',ParseIntPipe) id: number) {
        try {
            return await this.customerService.delete(id);
          } catch (error) {
            throw error;
          }
    }
}
