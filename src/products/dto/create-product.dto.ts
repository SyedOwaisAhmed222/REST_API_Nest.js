import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsPositive()
  @IsOptional() // Use IsOptional to make ownerId optional
  @ApiProperty({ required: false }) // Set required to false in ApiProperty
  ownerId: number | null; // Use | null to allow null values

}
