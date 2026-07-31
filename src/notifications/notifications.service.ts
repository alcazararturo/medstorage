import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import {
  DRIZZLE_PROVIDER,
  DrizzleClient,
} from "../../server/db/database.module";
import { notifications } from "../../server/db/schema";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    const [newNotifications] = await this.db
      .insert(notifications)
      .values({
        ...createNotificationDto,
      })
      .returning();
    return newNotifications;
  }

  async findAll() {
    return this.db
      .select()
      .from(notifications)
      .orderBy(notifications.familyMemberId, notifications.type);
  }

  async findOne(id: string) {
    const [findOneNotifications] = await this.db
      .select()
      .from(notifications)
      .where(eq(notifications.id, id));
    if (!findOneNotifications) {
      throw new NotFoundException(`No existe la notifications con id ${id}`);
    }
    return findOneNotifications;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const [updatedNotifications] = await this.db
      .update(notifications)
      .set({
        ...updateNotificationDto,
      })
      .where(eq(notifications.id, id))
      .returning();
    if (!updatedNotifications) {
      throw new NotFoundException(`No existe la notifications con id ${id}`);
    }
    return updatedNotifications;
  }

  async remove(id: string) {
    const [removeNotifications] = await this.db
      .delete(notifications)
      .where(eq(notifications.id, id))
      .returning();
    if (!removeNotifications) {
      throw new NotFoundException(`No existe la notifications con id ${id}`);
    }
    return removeNotifications;
  }
}
