import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  vin!: string;

  @IsNotEmpty()
  @IsString()
  make!: string;

  @IsNotEmpty()
  @IsString()
  model!: string;

  @IsNumber()
  year!: number;

  @IsOptional()
  @IsNumber()
  mileage?: number;
}
