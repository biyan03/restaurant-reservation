import { Controller, Get, Post,Put,Delete,Body,Param, Patch, ParseIntPipe } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';

@Controller('customer')
export class CustomerController {
    constructor(
        private customerService: CustomerService,
    ) { }

    @Post()
    create(@Body() data) {
        return this.customerService.create(data);
    }

    @Get()
    findAll() {
        return this.customerService.findAll();
    }

    @Put(':id')
    update(@Param('id',ParseIntPipe) id: number, @Body() data) {
        return this.customerService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.customerService.delete(id);
    }
}
