import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}

  async create(productId: string, createReportDto: CreateReportDto) {
    const product = this.reportRepository.create({
      ...createReportDto,
      product: { id: productId },
    });
    return this.reportRepository.save(product);
  }

  findAll(productId: string) {
    return this.reportRepository.find({
      where: {
        product: {
          id: productId,
        },
      },
      order: {
        isResolved: 'ASC',
      },
      relations: ['product'],
      select: {
        product: {
          id: true,
        },
      },
    });
  }

  findOne(productId: string, reportId: string) {
    return this.reportRepository.findOneBy({
      id: reportId,
      product: { id: productId },
    });
  }

  async update(
    reportId: string,
    productId: string,
    updateReportDto: UpdateReportDto,
  ) {
    await this.reportRepository.update({ id: reportId }, updateReportDto);
    return this.findOne(productId, reportId);
  }

  remove(reportId: string) {
    return this.reportRepository.delete({ id: reportId });
  }
}
