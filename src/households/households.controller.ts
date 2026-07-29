import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { HouseholdsService } from "./households.service";
import { CreateHouseholdDto } from "./dto/create-household.dto";
import { UpdateHouseholdDto } from "./dto/update-household.dto";
import { ParamsDto } from "../util/dto/paramsSchema";

@Controller("households")
export class HouseholdsController {
  constructor(private readonly householdsService: HouseholdsService) {}

  @Post()
  create(@Body() createHouseholdDto: CreateHouseholdDto) {
    return this.householdsService.create(createHouseholdDto);
  }

  @Get()
  findAll() {
    return this.householdsService.findAll();
  }

  @Get(":id")
  findOne(@Param() params: ParamsDto) {
    return this.householdsService.findOne(params.id);
  }

  @Patch(":id")
  update(
    @Param() params: ParamsDto,
    @Body() updateHouseholdDto: UpdateHouseholdDto,
  ) {
    return this.householdsService.update(params.id, updateHouseholdDto);
  }

  @Delete(":id")
  remove(@Param() params: ParamsDto) {
    return this.householdsService.remove(params.id);
  }
}
