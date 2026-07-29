import { createInsertSchema } from "drizzle-zod";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { notifications } from "../../../server/db/schema";

// 1. Generamos el esquema base desde Drizzle
const NotificationsSchema = createInsertSchema(notifications);

export class CreateNotificationDto extends createZodDto(NotificationsSchema) {}
