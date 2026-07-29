import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { StorageLocationsService } from "./storage-locations.service";
import { CreateStorageLocationDto } from "./dto/create-storage-location.dto";
import { UpdateStorageLocationDto } from "./dto/update-storage-location.dto";
import { ParamsDto } from "../util/dto/paramsSchema";

@Controller("storage-locations")
export class StorageLocationsController {
  constructor(
    private readonly storageLocationsService: StorageLocationsService,
  ) {}

  @Post()
  create(@Body() createStorageLocationDto: CreateStorageLocationDto) {
    return this.storageLocationsService.create(createStorageLocationDto);
  }

  @Get()
  findAll() {
    return this.storageLocationsService.findAll();
  }

  @Get(":id")
  findOne(@Param() params: ParamsDto) {
    return this.storageLocationsService.findOne(params.id);
  }

  @Patch(":id")
  update(
    @Param() params: ParamsDto,
    @Body() updateStorageLocationDto: UpdateStorageLocationDto,
  ) {
    return this.storageLocationsService.update(
      params.id,
      updateStorageLocationDto,
    );
  }

  @Delete(":id")
  remove(@Param() params: ParamsDto) {
    return this.storageLocationsService.remove(params.id);
  }
}
