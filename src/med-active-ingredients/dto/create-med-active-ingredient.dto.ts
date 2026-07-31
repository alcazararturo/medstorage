import { createInsertSchema } from "drizzle-zod";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { medicationActiveIngredients } from "../../../server/db/schema";

// 1. Generamos el esquema base desde Drizzle
export const MedActiveIngredientsSchema = createInsertSchema(
  medicationActiveIngredients,
);

export class CreateMedActiveIngredientDto extends createZodDto(
  MedActiveIngredientsSchema,
) {}
