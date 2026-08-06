import { IsNotEmpty, IsUUID, IsOptional, IsString } from 'class-validator';

export class CreateDiagnosticCaseDto {
  @IsNotEmpty()
  @IsUUID()
  vehicleId!: string;

  @IsOptional()
  @IsString()
  complaint?: string;

  @IsNotEmpty()
  @IsString()
  caseNumber!: string;
}
