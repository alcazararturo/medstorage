import { createZodDto } from "nestjs-zod";
import { NotificationsSchema } from "./create-notification.dto";

export class UpdateNotificationDto extends createZodDto(
  NotificationsSchema.partial(),
) {}
