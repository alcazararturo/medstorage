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
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';
import { HouseholdRoles } from '../auth/decorators/household-roles.decorator';

@Controller('households/:householdId/medications')
@UseGuards(JwtAuthGuard, HouseholdMemberGuard)
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @HouseholdRoles('owner')
  create(
    @Param('householdId') householdId: string,
    @Body() createMedicationDto: CreateMedicationDto,
  ) {
    return this.medicationsService.create(householdId, createMedicationDto);
  }

  @Get()
  @HouseholdRoles('owner', 'member')
  findAll(@Param('householdId') householdId: string) {
    return this.medicationsService.findAllByHousehold(householdId);
  }

  @Get(':id')
  @HouseholdRoles('owner', 'member')
  findOne(@Param('householdId') householdId: string, @Param('id') id: string) {
    return this.medicationsService.findOne(householdId, id);
  }

  @Patch(':id')
  @HouseholdRoles('owner')
  update(
    @Param('householdId') householdId: string,
    @Param('id') id: string,
    @Body() updateMedicationDto: UpdateMedicationDto,
  ) {
    return this.medicationsService.update(householdId, id, updateMedicationDto);
  }

  @Delete(':id')
  @HouseholdRoles('owner')
  remove(@Param('householdId') householdId: string, @Param('id') id: string) {
    return this.medicationsService.remove(householdId, id);
  }
}
