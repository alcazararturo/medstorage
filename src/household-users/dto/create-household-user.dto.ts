import { createInsertSchema } from "drizzle-zod";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { householdUsers } from "../../../server/db/schema";

// 1. Generamos el esquema base desde Drizzle
export const HouseholdUsersSchema = createInsertSchema(householdUsers);

export class CreateHouseholdUserDto extends createZodDto(
  HouseholdUsersSchema,
) {}
