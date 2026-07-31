import { createZodDto } from "nestjs-zod";
import { MedicationsSchema } from "./create-medication.dto";

export class UpdateMedicationDto extends createZodDto(
  MedicationsSchema.partial(),
) {}
