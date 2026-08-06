import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { DiagnosticsService } from '../services/diagnostics.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly service: DiagnosticsService) {}

  @Post()
  create(@Body() dto: CreateVehicleDto) {
    return this.service.createVehicle(dto);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getVehicleById(id);
  }
}
