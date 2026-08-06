import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateDtcDto {
  @IsNotEmpty()
  @IsString()
  code!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
