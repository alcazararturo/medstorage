import { z } from "zod";
import { createZodDto } from "nestjs-zod";

export const LoginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export class LoginDto extends createZodDto(LoginSchema) {}
