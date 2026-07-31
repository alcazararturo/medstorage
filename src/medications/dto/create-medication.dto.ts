import { createInsertSchema } from "drizzle-zod";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { medications } from "../../../server/db/schema";

// 1. Generamos el esquema base desde Drizzle
export const MedicationsSchema = createInsertSchema(medications);

export class CreateMedicationDto extends createZodDto(MedicationsSchema) {}
