import { PartialType } from "nestjs-zod";
import { CreateMedicationBatchDto } from "./create-medication-batch.dto";

export class UpdateMedicationBatchDto extends PartialType(
  CreateMedicationBatchDto,
) {}
