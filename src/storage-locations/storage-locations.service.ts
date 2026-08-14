import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
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
  async create(
    householdId: string,
    createStorageLocationDto: CreateStorageLocationDto,
  ) {
    const [newStorageLocation] = await this.db
      .insert(storageLocations)
      .values({
        ...(createStorageLocationDto as unknown as StorageLocationsInsert),
        householdId,
      })
      .returning();
    return newStorageLocation;
  }

  async findAllByHousehold(householdId: string) {
    return this.db
      .select()
      .from(storageLocations)
      .where(eq(storageLocations.householdId, householdId))
      .orderBy(storageLocations.name);
  }

  async findOne(householdId: string, id: string) {
    const [storageLocation] = await this.db
      .select()
      .from(storageLocations)
      .where(
        and(
          eq(storageLocations.id, id),
          eq(storageLocations.householdId, householdId),
        ),
      );
    if (!storageLocation) {
      throw new NotFoundException(
        `No existe el lugar de almacenamiento ${id} en el hogar ${householdId}`,
      );
    }
    return storageLocation;
  }

  async update(
    householdId: string,
    id: string,
    updateStorageLocationDto: UpdateStorageLocationDto,
  ) {
    const [updatedStorageLocation] = await this.db
      .update(storageLocations)
      .set(
        updateStorageLocationDto as unknown as Partial<StorageLocationsInsert>,
      )
      .where(
        and(
          eq(storageLocations.id, id),
          eq(storageLocations.householdId, householdId),
        ),
      )
      .returning();
    if (!updatedStorageLocation) {
      throw new NotFoundException(
        `No existe el lugar de almacenamiento ${id} en el hogar ${householdId}`,
      );
    }
    return updatedStorageLocation;
  }

  async remove(householdId: string, id: string) {
    const [removedStorageLocation] = await this.db
      .delete(storageLocations)
      .where(
        and(
          eq(storageLocations.id, id),
          eq(storageLocations.householdId, householdId),
        ),
      )
      .returning();
    if (!removedStorageLocation) {
      throw new NotFoundException(
        `No existe el lugar de almacenamiento ${id} en el hogar ${householdId}`,
      );
    }
    return removedStorageLocation;
  }
}
