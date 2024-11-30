import { Controller, Get, Post, Delete, Body, Param, Patch, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateCustomerDto } from '../dtos/create-customer.dto';


@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
    constructor(
        private customerService: CustomerService,
    ) { }

    @Post()
    @ApiBody({
      description: 'Create Customer',
      type: CreateCustomerDto, // DTO used for creating a customer
    })
    @ApiResponse({
      status: 201,
      description: 'Customer has been successfully created.',
    })
    @ApiResponse({
      status: 400,
      description: 'Bad Request. Validation failed.',
    })
    async create(@Body() data:CreateCustomerDto) {
        try {
            return await this.customerService.create(data);
          } catch (error) {
            throw new BadRequestException(error.message);
            throw error;
          }
    }

    @Get()
    @ApiOperation({ summary: 'Get all customer' })
    @ApiResponse({
      status: 200,
      description: 'Success get all customer.',
    })
    findAll() {
        return this.customerService.findAll();
    }


    @Get(':id')
    @ApiOperation({ summary: 'Get customer by ID' })
    @ApiResponse({
      status: 200,
      description: 'Success get customer by ID.',
    })
    findById(@Param('id',ParseIntPipe) id:number) {
      return this.customerService.getById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update customer data' })
    @ApiResponse({
      status: 200,
      description: 'Success Update customer data.',
    })
    update(@Param('id',ParseIntPipe) id: number, @Body() data) {
        return this.customerService.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete customer data' })
    @ApiResponse({
      status: 200,
      description: 'Success delete customer data.',
    })
    async remove(@Param('id',ParseIntPipe) id: number) {
        try {
            return await this.customerService.delete(id);
          } catch (error) {
            throw error;
          }
    }
}
