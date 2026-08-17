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
import { MedicationActiveIngredientsService } from './medication-active-ingredients.service';
import { CreateMedicationActiveIngredientsDto } from './dto/create-medication-active-ingredients.dto';
import { UpdateMedicationActiveIngredientsDto } from './dto/update-medication-active-ingredients.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';
import { HouseholdRoles } from '../auth/decorators/household-roles.decorator';

@Controller(
  'households/:householdId/medications/:medicationId/active-ingredients',
)
@UseGuards(JwtAuthGuard, HouseholdMemberGuard)
export class MedicationActiveIngredientsController {
  constructor(
    private readonly medicationActiveIngredientsService: MedicationActiveIngredientsService,
  ) {}

  @Post()
  @HouseholdRoles('owner')
  create(
    @Param('householdId') householdId: string,
    @Param('medicationId') medicationId: string,
    @Body() createDto: CreateMedicationActiveIngredientsDto,
  ) {
    return this.medicationActiveIngredientsService.create(
      householdId,
      medicationId,
      createDto,
    );
  }

  @Get()
  @HouseholdRoles('owner', 'member')
  findAll(
    @Param('householdId') householdId: string,
    @Param('medicationId') medicationId: string,
  ) {
    return this.medicationActiveIngredientsService.findAllByMedication(
      householdId,
      medicationId,
    );
  }

  @Get(':id')
  @HouseholdRoles('owner', 'member')
  findOne(
    @Param('householdId') householdId: string,
    @Param('medicationId') medicationId: string,
    @Param('id') id: string,
  ) {
    return this.medicationActiveIngredientsService.findOne(
      householdId,
      medicationId,
      id,
    );
  }

  @Patch(':id')
  @HouseholdRoles('owner')
  update(
    @Param('householdId') householdId: string,
    @Param('medicationId') medicationId: string,
    @Param('id') id: string,
    @Body() updateDto: UpdateMedicationActiveIngredientsDto,
  ) {
    return this.medicationActiveIngredientsService.update(
      householdId,
      medicationId,
      id,
      updateDto,
    );
  }

  @Delete(':id')
  @HouseholdRoles('owner')
  remove(
    @Param('householdId') householdId: string,
    @Param('medicationId') medicationId: string,
    @Param('id') id: string,
  ) {
    return this.medicationActiveIngredientsService.remove(
      householdId,
      medicationId,
      id,
    );
  }
}
