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
import { HouseholdsService } from './households.service';
import { CreateHouseholdDto } from './dto/create-household.dto';
import { UpdateHouseholdDto } from './dto/update-household.dto';
import { HouseholdParamsDto } from '../util/dto/householdParamsSchema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';
import { HouseholdRoles } from '../auth/decorators/household-roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('households')
@UseGuards(JwtAuthGuard)
export class HouseholdsController {
  constructor(private readonly householdsService: HouseholdsService) {}

  @Post()
  create(
    @Body() createHouseholdDto: CreateHouseholdDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.householdsService.create(createHouseholdDto);
  }

  @Get()
  findAll() {
    return this.householdsService.findAll();
  }

  @UseGuards(HouseholdMemberGuard)
  @HouseholdRoles('owner', 'member')
  @Get(':householdId')
  findOne(@Param() params: HouseholdParamsDto) {
    return this.householdsService.findOne(params.householdId);
  }

  @UseGuards(HouseholdMemberGuard)
  @HouseholdRoles('owner')
  @Patch(':householdId')
  update(
    @Param() params: HouseholdParamsDto,
    @Body() updateHouseholdDto: UpdateHouseholdDto,
  ) {
    return this.householdsService.update(
      params.householdId,
      updateHouseholdDto,
    );
  }

  @UseGuards(HouseholdMemberGuard)
  @HouseholdRoles('owner')
  @Delete(':householdId')
  remove(@Param() params: HouseholdParamsDto) {
    return this.householdsService.remove(params.householdId);
  }
}
