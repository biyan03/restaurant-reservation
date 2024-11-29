import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';

export class CreateTableDto {
  @ApiProperty({
    description: 'Table number',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @ApiProperty({ description: 'Capacity of people',example: 6,})
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

}