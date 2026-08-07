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
import { HouseholdUsersService } from './household-users.service';
import { CreateHouseholdUserDto } from './dto/create-household-user.dto';
import { UpdateHouseholdUserDto } from './dto/update-household-user.dto';
import { HouseholdParamsDto } from '../util/dto/householdParamsSchema';
import { ParamsDto } from '../util/dto/paramsSchema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';
import { HouseholdRoles } from '../auth/decorators/household-roles.decorator';

@Controller('households/:householdId/members')
@UseGuards(JwtAuthGuard, HouseholdMemberGuard)
export class HouseholdUsersController {
  constructor(private readonly householdUsersService: HouseholdUsersService) {}

  @Post()
  @HouseholdRoles('owner')
  create(
    @Param() params: HouseholdParamsDto,
    @Body() createHouseholdUserDto: CreateHouseholdUserDto,
  ) {
    // Forzamos que el householdId del body sea el de la URL por seguridad
    const data = { ...createHouseholdUserDto, householdId: params.householdId };
    return this.householdUsersService.create(data);
  }

  @Get()
  findAll() {
    return this.householdUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: ParamsDto) {
    return this.householdUsersService.findOne(params.id);
  }

  @Get()
  @HouseholdRoles('owner', 'member')
  findAllByHousehold(@Param() params: HouseholdParamsDto) {
    // Aquí deberíamos filtrar por householdId,
    // necesitamos agregar este método al servicio después
    return this.householdUsersService.findByHousehold(params.householdId);
  }

  @Patch(':id')
  update(
    @Param() params: ParamsDto,
    @Body() updateHouseholdUserDto: UpdateHouseholdUserDto,
  ) {
    return this.householdUsersService.update(params.id, updateHouseholdUserDto);
  }

  @Delete(':id')
  @HouseholdRoles('owner')
  remove(@Param() params: ParamsDto) {
    return this.householdUsersService.remove(params.id);
  }
}
