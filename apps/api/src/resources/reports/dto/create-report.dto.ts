import { IsNotEmpty, IsEnum } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  report: string;

  @IsEnum(['Minor', 'Moderate', 'Major', 'Critical'])
  severity: string;
}
