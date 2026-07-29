import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const ParamsSchema = z.object({
  id: z.uuid(),
});

export class ParamsDto extends createZodDto(ParamsSchema) {}
