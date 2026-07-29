import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MedicationBatchesService } from "./medication-batches.service";
import { CreateMedicationBatchDto } from "./dto/create-medication-batch.dto";
import { UpdateMedicationBatchDto } from "./dto/update-medication-batch.dto";
import { ParamsDto } from "../util/dto/paramsSchema";

@Controller("medication-batches")
export class MedicationBatchesController {
  constructor(
    private readonly medicationBatchesService: MedicationBatchesService,
  ) {}

  @Post()
  create(@Body() createMedicationBatchDto: CreateMedicationBatchDto) {
    return this.medicationBatchesService.create(createMedicationBatchDto);
  }

  @Get()
  findAll() {
    return this.medicationBatchesService.findAll();
  }

  @Get(":id")
  findOne(@Param() params: ParamsDto) {
    return this.medicationBatchesService.findOne(params.id);
  }

  @Patch(":id")
  update(
    @Param() params: ParamsDto,
    @Body() updateMedicationBatchDto: UpdateMedicationBatchDto,
  ) {
    return this.medicationBatchesService.update(
      params.id,
      updateMedicationBatchDto,
    );
  }

  @Delete(":id")
  remove(@Param() params: ParamsDto) {
    return this.medicationBatchesService.remove(params.id);
  }
}
