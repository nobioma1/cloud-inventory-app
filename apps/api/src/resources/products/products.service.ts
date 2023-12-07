import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(workspaceId: string, createProductDto: CreateProductDto) {
    const product = this.productRepository.create({
      ...createProductDto,
      workspace: { id: workspaceId },
    });

    return this.productRepository.save(product);
  }

  findAll(workspaceId: string) {
    return this.productRepository.find({
      where: {
        workspace: {
          id: workspaceId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['workspace'],
      select: {
        workspace: {
          id: true,
        },
      },
    });
  }

  findOne(productId: string, workspaceId: string) {
    return this.productRepository.findOne({
      where: {
        workspace: {
          id: workspaceId,
        },
        id: productId,
      },
      relations: ['workspace'],
      select: {
        workspace: {
          id: true,
        },
      },
    });
  }

  async update(
    productId: string,
    workspaceId: string,
    updateProductDto: UpdateProductDto,
  ) {
    await this.productRepository.update({ id: productId }, updateProductDto);
    return this.findOne(productId, workspaceId);
  }

  remove(productId: string) {
    return this.productRepository.delete({ id: productId });
  }
}
