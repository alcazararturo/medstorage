import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MedicationBatchesService } from './medication-batches.service';
import { CreateMedicationBatchDto } from './dto/create-medication-batch.dto';
import { UpdateMedicationBatchDto } from './dto/update-medication-batch.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';
import { HouseholdRoles } from '../auth/decorators/household-roles.decorator';

@Controller('/households/:householdId/medications/:medicationId/batches')
@UseGuards(JwtAuthGuard, HouseholdMemberGuard)
export class MedicationBatchesController {
  constructor(
    private readonly medicationBatchesService: MedicationBatchesService,
  ) {}

  @Post()
  @HouseholdRoles('owner')
  create(
    @Param('householdId') householdId: string,
    @Param('medicationId') medicationId: string,
    @Param('storageLocationId') storageLocationId: string,
    @Body() createDto: CreateMedicationBatchDto,
  ) {
    return this.medicationBatchesService.create(
      householdId,
      medicationId,
      storageLocationId,
      createDto,
    );
  }

  @Get()
  @HouseholdRoles('owner', 'member')
  findAll(
    @Param('householdId') householdId: string,
    @Param('medicationId') medicationId: string,
    @Param('storageLocationId') storageLocationId: string,
  ) {
    return this.medicationBatchesService.findAllByBatches(
      householdId,
      storageLocationId,
      medicationId,
    );
  }

  @Get(':id')
  @HouseholdRoles('owner', 'member')
  findOne(
    @Param('householdId') householdId: string,
    @Param('medicationId') medicationId: string,
    @Param('storageLocationId') storageLocationId: string,
    @Param('id') id: string,
  ) {
    return this.medicationBatchesService.findOne(
      householdId,
      medicationId,
      storageLocationId,
      id,
    );
  }

  @Patch(':id')
  @HouseholdRoles('owner')
  update(
    @Param('householdId') householdId: string,
    @Param('medicationId') medicationId: string,
    @Param('storageLocationId') storageLocationId: string,
    @Param('id') id: string,
    @Body() updateDto: UpdateMedicationBatchDto,
  ) {
    return this.medicationBatchesService.update(
      householdId,
      medicationId,
      storageLocationId,
      id,
      updateDto,
    );
  }

  @Delete(':id')
  @HouseholdRoles('owner')
  remove(
    @Param('householdId') householdId: string,
    @Param('medicationId') medicationId: string,
    @Param('storageLocationId') storageLocationId: string,
    @Param('id') id: string,
  ) {
    return this.medicationBatchesService.remove(
      householdId,
      medicationId,
      storageLocationId,
      id,
    );
  }
}
