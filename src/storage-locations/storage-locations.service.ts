import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER } from '../../server/db/database.module';
import type { DrizzleClient } from '../../server/db/database.module';
import { storageLocations } from '../../server/db/schema';
import type { InferInsertModel } from 'drizzle-orm';
import { CreateStorageLocationDto } from './dto/create-storage-location.dto';
import { UpdateStorageLocationDto } from './dto/update-storage-location.dto';

type StorageLocationsInsert = InferInsertModel<typeof storageLocations>;

@Injectable()
export class StorageLocationsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}
  async create(createStorageLocationDto: CreateStorageLocationDto) {
    const [newStorageLocations] = await this.db
      .insert(storageLocations)
      .values(createStorageLocationDto as unknown as StorageLocationsInsert)
      .returning();
    return newStorageLocations;
  }

  async findAll() {
    return this.db
      .select()
      .from(storageLocations)
      .orderBy(storageLocations.householdId, storageLocations.name);
  }

  async findOne(id: string) {
    const [findOneStorageLocations] = await this.db
      .select()
      .from(storageLocations)
      .where(eq(storageLocations.id, id));
    if (!findOneStorageLocations) {
      throw new NotFoundException(`No existe el storageLocations con id ${id}`);
    }
    return findOneStorageLocations;
  }

  async update(id: string, updateStorageLocationDto: UpdateStorageLocationDto) {
    const [updatedStorageLocations] = await this.db
      .update(storageLocations)
      .set(
        updateStorageLocationDto as unknown as Partial<StorageLocationsInsert>,
      )
      .where(eq(storageLocations.id, id))
      .returning();
    if (!updatedStorageLocations) {
      throw new NotFoundException(`No existe el storageLocations con id ${id}`);
    }
    return updatedStorageLocations;
  }

  async remove(id: string) {
    const [removeStorageLocations] = await this.db
      .delete(storageLocations)
      .where(eq(storageLocations.id, id))
      .returning();
    if (!removeStorageLocations) {
      throw new NotFoundException(`No existe el storageLocations con id ${id}`);
    }
    return removeStorageLocations;
  }
}
