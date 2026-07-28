import { createInsertSchema } from "drizzle-zod";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { medicationBatches } from "../../../server/db/schema"; // Modifica la ruta según tu proyecto

// 1. Generamos el esquema base desde Drizzle
const BaseInsertBatchSchema = createInsertSchema(medicationBatches);

// 2. Refinamos campos si es necesario (Opcional, pero muy recomendado para tipos de datos complejos)
const RefinedBatchSchema = BaseInsertBatchSchema.extend({
  // Drizzle lee 'decimal' como string para evitar pérdida de precisión.
  // Con esto forzamos a que la API acepte un número en el JSON y Zod lo valide.
  quantity: z.number().positive(),

  // Forzamos a que las fechas se envíen en formato texto ISO (YYYY-MM-DD)
  expirationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Debe ser formato YYYY-MM-DD"),
  openedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Debe ser formato YYYY-MM-DD")
    .optional()
    .nullable(),
});

// 3. Exportamos la clase DTO final que NestJS va a utilizar
export class CreateMedicationBatchDto extends createZodDto(
  RefinedBatchSchema,
) {}
