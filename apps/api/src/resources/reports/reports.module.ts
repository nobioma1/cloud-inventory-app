import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

import { ProductsModule } from 'resources/products/products.module';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Report } from './entities/report.entity';
import { WorkspacesModule } from 'resources/workspaces/workspaces.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    forwardRef(() => WorkspacesModule),
    ProductsModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
