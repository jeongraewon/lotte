import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
  const product = await this.productsRepository.findOneBy({ id });
  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
  return product;
}

  create(product: Partial<Product>): Promise<Product> {
    const newProduct = this.productsRepository.create(product);
    return this.productsRepository.save(newProduct);
  }

  async update(id: number, update: Partial<Product>): Promise<Product> {
    await this.productsRepository.update(id, update);
    return this.findOne(id);
  }

  remove(id: number): Promise<void> {
    return this.productsRepository.delete(id).then(() => undefined);
  }
}
