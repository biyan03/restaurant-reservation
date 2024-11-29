import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, isBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';

export class UpdateTableDto {
  @ApiProperty({ description: 'Capacity of people',example: 6,})
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @ApiProperty({ description: 'Available table',example: true,})
  @IsBoolean()
  isAvailable:boolean;
}