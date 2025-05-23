import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(Number(id));
  }

  @Post()
  create(@Body() product: Partial<Product>): Promise<Product> {
    return this.productsService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() update: Partial<Product>): Promise<Product> {
    return this.productsService.update(Number(id), update);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(Number(id));
  }
}
