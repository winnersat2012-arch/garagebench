import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTestDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  expectedResult?: string;

  @IsOptional()
  @IsString()
  actualResult?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
