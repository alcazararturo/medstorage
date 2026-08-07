import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const RegisterSchema = z.object({
  email: z.string().trim().email('El correo electrónico no es válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  fullName: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(150, 'El nombre no puede exceder 150 caracteres'),
  householdName: z
    .string()
    .trim()
    .min(2, 'El nombre del hogar debe tener al menos 2 caracteres')
    .max(150, 'El nombre del hogar no puede exceder 150 caracteres'),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}
