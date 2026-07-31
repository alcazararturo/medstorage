import { createZodDto } from "nestjs-zod";
import { AllergiesSchema } from "./create-allergy.dto";

export class UpdateAllergyDto extends createZodDto(AllergiesSchema.partial()) {}
