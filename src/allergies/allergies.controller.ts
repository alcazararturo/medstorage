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
import { AllergiesService } from './allergies.service';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';
import { HouseholdRoles } from '../auth/decorators/household-roles.decorator';

@Controller('households/:householdId/family-members/:familyMemberId/allergies')
@UseGuards(JwtAuthGuard, HouseholdMemberGuard)
export class AllergiesController {
  constructor(private readonly allergiesService: AllergiesService) {}

  @Post()
  @HouseholdRoles('owner')
  create(
    @Param('familyMemberId') familyMemberId: string,
    @Body() createAllergyDto: CreateAllergyDto,
  ) {
    return this.allergiesService.create(familyMemberId, createAllergyDto);
  }

  @Get()
  @HouseholdRoles('owner', 'member')
  findAll(@Param('familyMemberId') familyMemberId: string) {
    return this.allergiesService.findAllByFamilyMember(familyMemberId);
  }

  @Get(':id')
  @HouseholdRoles('owner', 'member')
  findOne(
    @Param('familyMemberId') familyMemberId: string,
    @Param('id') id: string,
  ) {
    return this.allergiesService.findOne(familyMemberId, id);
  }

  @Patch(':id')
  @HouseholdRoles('owner')
  update(
    @Param('familyMemberId') familyMemberId: string,
    @Param('id') id: string,
    @Body() updateAllergyDto: UpdateAllergyDto,
  ) {
    return this.allergiesService.update(familyMemberId, id, updateAllergyDto);
  }

  @Delete(':id')
  @HouseholdRoles('owner')
  remove(
    @Param('familyMemberId') familyMemberId: string,
    @Param('id') id: string,
  ) {
    return this.allergiesService.remove(familyMemberId, id);
  }
}
