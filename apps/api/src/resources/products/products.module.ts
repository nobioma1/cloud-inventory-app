import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { WorkspacesModule } from 'resources/workspaces/workspaces.module';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), WorkspacesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
