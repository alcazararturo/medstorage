import { createInsertSchema } from "drizzle-zod";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { households } from "../../../server/db/schema";

// 1. Generamos el esquema base desde Drizzle
export const HouseholdsSchema = createInsertSchema(households);

export class CreateHouseholdDto extends createZodDto(HouseholdsSchema) {}
