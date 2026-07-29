import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AllergiesService } from "./allergies.service";
import { CreateAllergyDto } from "./dto/create-allergy.dto";
import { UpdateAllergyDto } from "./dto/update-allergy.dto";
import { ParamsDto } from "../util/dto/paramsSchema";

@Controller("allergies")
export class AllergiesController {
  constructor(private readonly allergiesService: AllergiesService) {}

  @Post()
  create(@Body() createAllergyDto: CreateAllergyDto) {
    return this.allergiesService.create(createAllergyDto);
  }

  @Get()
  findAll() {
    return this.allergiesService.findAll();
  }

  @Get(":id")
  findOne(@Param() params: ParamsDto) {
    return this.allergiesService.findOne(params.id);
  }

  @Patch(":id")
  update(
    @Param() params: ParamsDto,
    @Body() updateAllergyDto: UpdateAllergyDto,
  ) {
    return this.allergiesService.update(params.id, updateAllergyDto);
  }

  @Delete(":id")
  remove(@Param() params: ParamsDto) {
    return this.allergiesService.remove(params.id);
  }
}
