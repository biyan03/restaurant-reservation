import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'The first name of the customer',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The email of the customer',example: 'john@gmail.com',})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The phone number of the customer',example: '085768234234',})
  @IsNotEmpty()
  @IsString()
  phone: string;
}