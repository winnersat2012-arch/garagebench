import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSymptomDto {
  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  frequency?: string;

  @IsOptional()
  @IsString()
  context?: string;
}
