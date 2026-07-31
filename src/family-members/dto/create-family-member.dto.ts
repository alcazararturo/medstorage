import { createInsertSchema } from "drizzle-zod";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { familyMembers } from "../../../server/db/schema"; // Modifica la ruta según tu proyecto

// 1. Generamos el esquema base desde Drizzle
const FamilyMembersSchema = createInsertSchema(familyMembers);

// 2. Refinamos campos si es necesario (Opcional, pero muy recomendado para tipos de datos complejos)
export const RefinedMembersSchema = FamilyMembersSchema.extend({
  // Forzamos a que las fechas se envíen en formato texto ISO (YYYY-MM-DD)
  birthDate: z
    .string()
    .regex(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      "Debe ser formato YYYY-MM-DD",
    ),
});

export class CreateFamilyMemberDto extends createZodDto(RefinedMembersSchema) {}
