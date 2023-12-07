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
import { IsProductGuard } from 'resources/products/guards/is-product.guard';
import { Product } from 'resources/products/decorators/product.decorator';
import { Product as ProductEntity } from 'resources/products/entities/product.entity';

import { Report as ReportEntity } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './decorators/report.decorator';
import { ReportsService } from './reports.service';
import { IsReportGuard } from './guards/is-report.guard';
import { UpdateReportDto } from './dto/update-report.dto';

@Controller('workspaces/:workspaceId/products/:productId/reports')
@UseGuards(IsWorkspaceGuard, IsProductGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @HttpCode(201)
  create(
    @Product() product: ProductEntity,
    @Body() createReportDto: CreateReportDto,
  ) {
    return this.reportsService.create(product.id, createReportDto);
  }

  @Get()
  findAll(@Product() product: ProductEntity) {
    return this.reportsService.findAll(product.id);
  }

  @UseGuards(IsReportGuard)
  @Patch(':reportId')
  update(
    @Product() product: ProductEntity,
    @Report() report: ReportEntity,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    return this.reportsService.update(report.id, product.id, updateReportDto);
  }

  @UseGuards(IsReportGuard)
  @Delete(':reportId')
  @HttpCode(204)
  async remove(@Report() report: ReportEntity) {
    await this.reportsService.remove(report.id);
    return { id: report.id };
  }
}
