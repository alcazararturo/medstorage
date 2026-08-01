import { z } from "zod";
import { createZodDto } from "nestjs-zod";

export const CreateUserSchema = z.object({
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
