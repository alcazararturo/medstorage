import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HouseholdUsersService } from './household-users.service';
import { CreateHouseholdUserDto } from './dto/create-household-user.dto';
import { UpdateHouseholdUserDto } from './dto/update-household-user.dto';
import { ParamsDto } from '../util/dto/paramsSchema';

@Controller('household-users')
export class HouseholdUsersController {
  constructor(private readonly householdUsersService: HouseholdUsersService) {}

  @Post()
  create(@Body() createHouseholdUserDto: CreateHouseholdUserDto) {
    return this.householdUsersService.create(createHouseholdUserDto);
  }

  @Get()
  findAll() {
    return this.householdUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: ParamsDto) {
    return this.householdUsersService.findOne(params.id);
  }

  @Patch(':id')
  update(
    @Param() params: ParamsDto,
    @Body() updateHouseholdUserDto: UpdateHouseholdUserDto,
  ) {
    return this.householdUsersService.update(params.id, updateHouseholdUserDto);
  }

  @Delete(':id')
  remove(@Param() params: ParamsDto) {
    return this.householdUsersService.remove(params.id);
  }
}
