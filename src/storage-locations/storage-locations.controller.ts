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
import { StorageLocationsService } from './storage-locations.service';
import { CreateStorageLocationDto } from './dto/create-storage-location.dto';
import { UpdateStorageLocationDto } from './dto/update-storage-location.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HouseholdMemberGuard } from '../auth/guards/household-member.guard';
import { HouseholdRoles } from '../auth/decorators/household-roles.decorator';

@Controller('households/:householdId/storage-locations')
@UseGuards(JwtAuthGuard, HouseholdMemberGuard)
export class StorageLocationsController {
  constructor(
    private readonly storageLocationsService: StorageLocationsService,
  ) {}

  @Post()
  @HouseholdRoles('owner')
  create(
    @Param('householdId') householdId: string,
    @Body() createStorageLocationDto: CreateStorageLocationDto,
  ) {
    return this.storageLocationsService.create(
      householdId,
      createStorageLocationDto,
    );
  }

  @Get()
  @HouseholdRoles('owner', 'member')
  findAll(@Param('householdId') householdId: string) {
    return this.storageLocationsService.findAllByHousehold(householdId);
  }

  @Get(':id')
  @HouseholdRoles('owner', 'member')
  findOne(@Param('householdId') householdId: string, @Param('id') id: string) {
    return this.storageLocationsService.findOne(householdId, id);
  }

  @Patch(':id')
  @HouseholdRoles('owner')
  update(
    @Param('householdId') householdId: string,
    @Param('id') id: string,
    @Body() updateStorageLocationDto: UpdateStorageLocationDto,
  ) {
    return this.storageLocationsService.update(
      householdId,
      id,
      updateStorageLocationDto,
    );
  }

  @Delete(':id')
  @HouseholdRoles('owner')
  remove(@Param('householdId') householdId: string, @Param('id') id: string) {
    return this.storageLocationsService.remove(householdId, id);
  }
}
