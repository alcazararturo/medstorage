import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER, DrizzleClient } from "../../server/db/database.module";
import { notifications } from '../../../server/db/schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient
  )
  async create(createNotificationDto: CreateNotificationDto) {
    const [newBatch] = await this.db
      .insert(notifications)
      .values({
        ...createNotificationDto,        
      })
      .returning();
    return newBatch;
  }

  async findAll() {
    const [findBatch] = await this.db
    .select().from(notifications).orderBy(notifications.familyMemberId, notifications.type);
    return findBatch;
  }

  async findOne(id: string) {
    const [findOneBatch] = await this.db
    .select().from(notifications).where(eq(notifications.id, id));
    if (!findOneBatch) {
      throw new NotFoundException(`No existe la notifications con id ${id}`,); 
    }
    return findOneBatch;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const [updatedBatch] = await this.db
      .update(notifications)
      .set({
        ...updateNotificationDto,        
      })
      .where(eq(notifications.id, id))
      .returning();
      if (!updatedBatch) {
        throw new NotFoundException(`No existe la notifications con id ${id}`,);
      }
    return updatedBatch;
  }

  async remove(id: string) {
    const [removeBatch] = await this.db.delete(notifications)
    .where(eq(notifications.id, id))
    .returning();
    if (!removeBatch) {
      `No existe la notifications con id ${id}`,
    }
    return removeBatch;
  }
}
