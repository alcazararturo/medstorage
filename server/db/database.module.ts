import { Module, Global } from "@nestjs/common";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../server/db/schema"; // Ruta hacia tu schema.ts

// Definimos un token único para la inyección de dependencias
export const DRIZZLE_PROVIDER = "DRIZZLE_PROVIDER";

@Global() // Hace que el módulo esté disponible en toda la aplicación sin re-importarlo
@Module({
  providers: [
    {
      provide: DRIZZLE_PROVIDER,
      useFactory: () => {
        // Inicializamos el cliente HTTP nativo de Neon
        const sql = neon(process.env.DATABASE_URL!);

        // Pasamos el cliente y el schema a Drizzle
        return drizzle(sql, { schema });
      },
    },
  ],
  exports: [DRIZZLE_PROVIDER], // Lo exportamos para que otros servicios lo inyecten
})
export class DatabaseModule {}

/*
"Hola, vamos a continuar con el proyecto MedStorage. Es un backend en NestJS con Drizzle ORM y Neon (PostgreSQL). Ya configuramos el DatabaseModule global en server/db/database.module.ts, usamos nestjs-zod + drizzle-zod para los DTOs automáticos desde el esquema, y configuramos el ZodValidationPipe global en el main.ts. El objetivo actual es generar los recursos con el CLI de NestJS y probar los endpoints en Postman."
*/
