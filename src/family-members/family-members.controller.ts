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
import { FamilyMembersService } from './family-members.service';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';
import { HouseholdRoles } from '../auth/decorators/household-roles.decorator';

@Controller('households/:householdId/family-members')
@UseGuards(JwtAuthGuard, HouseholdMemberGuard)
export class FamilyMembersController {
  constructor(private readonly familyMembersService: FamilyMembersService) {}

  @Post()
  @HouseholdRoles('owner')
  create(
    @Param('householdId') householdId: string,
    @Body() createFamilyMemberDto: CreateFamilyMemberDto,
  ) {
    return this.familyMembersService.create(householdId, createFamilyMemberDto);
  }

  @Get()
  @HouseholdRoles('owner', 'member')
  findAll(@Param('householdId') householdId: string) {
    return this.familyMembersService.findAllByHousehold(householdId);
  }

  @Get(':id')
  @HouseholdRoles('owner', 'member')
  findOne(@Param('householdId') householdId: string, @Param('id') id: string) {
    return this.familyMembersService.findOne(householdId, id);
  }

  @Patch(':id')
  @HouseholdRoles('owner')
  update(
    @Param('householdId') householdId: string,
    @Param('id') id: string,
    @Body() updateFamilyMemberDto: UpdateFamilyMemberDto,
  ) {
    return this.familyMembersService.update(
      householdId,
      id,
      updateFamilyMemberDto,
    );
  }

  @Delete(':id')
  @HouseholdRoles('owner')
  remove(@Param('householdId') householdId: string, @Param('id') id: string) {
    return this.familyMembersService.remove(householdId, id);
  }
}
