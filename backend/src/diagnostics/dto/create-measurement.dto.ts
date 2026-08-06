import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateMeasurementDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  value!: number;

  @IsNotEmpty()
  @IsString()
  unit!: string;

  @IsOptional()
  @IsString()
  note?: string;
}
