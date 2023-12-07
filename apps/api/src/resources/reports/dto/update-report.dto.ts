import { IsBoolean } from 'class-validator';

export class UpdateReportDto {
  @IsBoolean()
  isResolved: boolean;
}
