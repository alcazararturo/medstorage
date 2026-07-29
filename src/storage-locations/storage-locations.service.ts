import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER, DrizzleClient } from "../../server/db/database.module";
import { storageLocations } from '../../../server/db/schema';
import { CreateStorageLocationDto } from './dto/create-storage-location.dto';
import { UpdateStorageLocationDto } from './dto/update-storage-location.dto';

@Injectable()
export class StorageLocationsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient
  )
  async create(createStorageLocationDto: CreateStorageLocationDto) {
    const [newBatch] = await this.db
      .insert(storageLocations)
      .values({
        ...createStorageLocationDto,        
      })
      .returning();
    return newBatch;
  }

  async findAll() {
    const [findBatch] = await this.db
    .select().from(storageLocations).orderBy(storageLocations.householdId, storageLocations.name);
    return findBatch;
  }

  async findOne(id: string) {
    const [findOneBatch] = await this.db
    .select().from(storageLocations).where(eq(storageLocations.id, id));
    if (!findOneBatch) {
      throw new NotFoundException(`No existe el storageLocations con id ${id}`,); 
    }
    return findOneBatch;
  }

  async update(id: string, updateStorageLocationDto: UpdateStorageLocationDto) {
    const [updatedBatch] = await this.db
      .update(storageLocations)
      .set({
        ...updateStorageLocationDto,        
      })
      .where(eq(storageLocations.id, id))
      .returning();
      if (!updatedBatch) {
        throw new NotFoundException(`No existe el storageLocations con id ${id}`,);
      }
    return updatedBatch;
  }

  async remove(id: string) {
    const [removeBatch] = await this.db.delete(storageLocations)
    .where(eq(storageLocations.id, id))
    .returning();
    if (!removeBatch) {
      `No existe el storageLocations con id ${id}`,
    }
    return removeBatch;
  }
}
