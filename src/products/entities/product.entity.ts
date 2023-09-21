import { Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity implements Product{
    @ApiProperty()
    id: number;

    @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;
}
