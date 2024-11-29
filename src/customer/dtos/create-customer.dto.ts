import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'The name of the customer' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The email of the customer' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The phone number of the customer' })
  @IsNotEmpty()
  @IsString()
  phone: string;
}