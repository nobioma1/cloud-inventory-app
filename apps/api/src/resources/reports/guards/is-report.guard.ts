import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ReportsService } from '../reports.service';

@Injectable()
export class IsReportGuard implements CanActivate {
  constructor(private readonly reportsService: ReportsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const productId = request?.params?.productId;
    const reportId = request?.params?.reportId;

    try {
      const report = await this.reportsService.findOne(productId, reportId);

      if (!report) {
        throw new Error('Report not found');
      }

      request['report'] = report;
    } catch {
      throw new NotFoundException();
    }

    return true;
  }
}
