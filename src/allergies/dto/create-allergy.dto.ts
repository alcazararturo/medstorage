import { createInsertSchema } from "drizzle-zod";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { allergies } from "../../../server/db/schema";

export const AllergiesSchema = createInsertSchema(allergies);

export class CreateAllergyDto extends createZodDto(AllergiesSchema) {}
