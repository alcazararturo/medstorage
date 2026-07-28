import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicationBatchesService } from './medication-batches.service';
import { CreateMedicationBatchDto } from './dto/create-medication-batch.dto';
import { UpdateMedicationBatchDto } from './dto/update-medication-batch.dto';

@Controller('medication-batches')
export class MedicationBatchesController {
  constructor(private readonly medicationBatchesService: MedicationBatchesService) {}

  @Post()
  create(@Body() createMedicationBatchDto: CreateMedicationBatchDto) {
    return this.medicationBatchesService.create(createMedicationBatchDto);
  }

  @Get()
  findAll() {
    return this.medicationBatchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationBatchesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicationBatchDto: UpdateMedicationBatchDto) {
    return this.medicationBatchesService.update(+id, updateMedicationBatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationBatchesService.remove(+id);
  }
}
