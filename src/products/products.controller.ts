import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductEntity })
  async create(@Body() createProductDto: CreateProductDto) {
    return new ProductEntity(
      await this.productsService.create(createProductDto)
    );
  }

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async findAll() {
    const products = await this.productsService.findAll();
    return products.map((article) => new ProductEntity(article));  }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new ProductEntity(await this.productsService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProductEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return new ProductEntity(
      await this.productsService.update(id, updateProductDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProductEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ProductEntity(await this.productsService.remove(id));  }
}
