import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { ParamsDto } from '../util/dto/paramsSchema';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: ParamsDto) {
    return this.medicationsService.findOne(params.id);
  }

  @Patch(':id')
  update(
    @Param() params: ParamsDto,
    @Body() updateMedicationDto: UpdateMedicationDto,
  ) {
    return this.medicationsService.update(params.id, updateMedicationDto);
  }

  @Delete(':id')
  remove(@Param() params: ParamsDto) {
    return this.medicationsService.remove(params.id);
  }
}
