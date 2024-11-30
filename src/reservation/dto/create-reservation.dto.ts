import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({description: 'Customer Id',example: 1,})
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @ApiProperty({ description: 'Table Id',example: 1,})
  @IsNotEmpty()
  @IsNumber()
  tableId: number;

  @ApiProperty({ description: 'Date Reservation',example: '2024-11-30',})
  @IsNotEmpty()
  @IsDateString()
  reservedAt: Date;

  @ApiProperty({ description: 'Time Reservation',example: '10:30',})
  @IsNotEmpty()
  @IsString()
  reservedTime: string;

  @ApiProperty({ description: 'Duration Reservation (Hours)',example: 2,})
  @IsNotEmpty()
  @IsNumber()
  duration: number;
} 