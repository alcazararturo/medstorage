import { createInsertSchema } from "drizzle-zod";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { allergies } from "../../../server/db/schema";

// 1. Generamos el esquema base desde Drizzle
const AllergiesSchema = createInsertSchema(allergies);

export class CreateAllergyDto extends createZodDto(AllergiesSchema) {}
