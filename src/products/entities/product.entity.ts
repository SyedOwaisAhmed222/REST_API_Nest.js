import { Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

export class ProductEntity implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ required: false, nullable: true })
  ownerId: number | null;

  @ApiProperty({ required: false, type: UserEntity })
  owner?: UserEntity;

  constructor({ owner, ...data }: Partial<ProductEntity>) {
    Object.assign(this, data);
    if (owner) {
      this.owner = new UserEntity(owner);
    }
  }
}
