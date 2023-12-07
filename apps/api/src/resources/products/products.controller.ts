import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { IsWorkspaceGuard } from 'resources/workspaces/guards/is-workspace.guard';
import { Workspace } from 'resources/workspaces/decorators/workspace.decorator';
import { Workspace as WorkspaceEntity } from 'resources/workspaces/entities/workspace.entity';

import { Product as ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './decorators/product.decorator';
import { ProductsService } from './products.service';
import { IsProductGuard } from './guards/is-product.guard';

@Controller('workspaces/:workspaceId/products')
@UseGuards(IsWorkspaceGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(201)
  create(
    @Workspace() workspace: WorkspaceEntity,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(workspace.id, createProductDto);
  }

  @Get()
  findAll(@Workspace() workspace: WorkspaceEntity) {
    return this.productsService.findAll(workspace.id);
  }

  @UseGuards(IsProductGuard)
  @Get(':productId')
  findOne(
    @Workspace() workspace: WorkspaceEntity,
    @Product() product: ProductEntity,
  ) {
    return this.productsService.findOne(product.id, workspace.id);
  }

  @UseGuards(IsProductGuard)
  @Patch(':productId')
  update(
    @Workspace() workspace: WorkspaceEntity,
    @Product() product: ProductEntity,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(
      product.id,
      workspace.id,
      updateProductDto,
    );
  }

  @UseGuards(IsProductGuard)
  @Delete(':productId')
  @HttpCode(204)
  async remove(@Product() product: ProductEntity) {
    await this.productsService.remove(product.id);
    return { id: product.id };
  }
}
