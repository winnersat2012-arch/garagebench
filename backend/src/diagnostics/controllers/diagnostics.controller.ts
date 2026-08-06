import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateDiagnosticCaseDto } from '../dto/create-diagnostic-case.dto';
import { CreateDtcDto } from '../dto/create-dtc.dto';
import { CreateSymptomDto } from '../dto/create-symptom.dto';
import { CreateTestDto } from '../dto/create-test.dto';
import { DiagnosticsService } from '../services/diagnostics.service';

@Controller('cases')
export class DiagnosticsController {
  constructor(private readonly service: DiagnosticsService) {}

  @Post()
  createCase(@Body() dto: CreateDiagnosticCaseDto) {
    return this.service.createCase(dto);
  }

  @Get(':id')
  getCase(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.getCase(id);
  }

  @Post(':id/symptoms')
  addSymptom(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: CreateSymptomDto) {
    return this.service.addSymptom(id, dto);
  }

  @Post(':id/dtcs')
  addDtc(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: CreateDtcDto) {
    return this.service.addDtc(id, dto);
  }

  @Post(':id/tests')
  addTest(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: CreateTestDto) {
    return this.service.addTest(id, dto);
  }

  @Post(':id/assist')
  requestAssist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.requestAssistant(id);
  }
}
