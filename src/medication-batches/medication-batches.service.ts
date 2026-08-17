import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER } from '../../server/db/database.module';
import type { DrizzleClient } from '../../server/db/database.module';
import {
  medicationBatches,
  medications,
  storageLocations,
} from '../../server/db/schema';
import type { InferInsertModel } from 'drizzle-orm';
import { CreateMedicationBatchDto } from './dto/create-medication-batch.dto';
import { UpdateMedicationBatchDto } from './dto/update-medication-batch.dto';

type MedicationBatchesInsert = InferInsertModel<typeof medicationBatches>;

@Injectable()
export class MedicationBatchesService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}

  private async verifyMedicationBelongsToHousehold(
    householdId: string,
    medicationId: string,
    storageLocationId: string,
  ) {
    const [medicationbatches] = await this.db
      .select({ id: medicationBatches.id })
      .from(medicationBatches)
      .where(
        and(
          eq(medicationBatches.id, medicationId),
          eq(medicationBatches.storageLocationId, storageLocationId),
          eq(storageLocations.householdId, householdId),
        ),
      );

    if (!medicationbatches) {
      throw new NotFoundException(`No existe el medicamento ${medicationId}`);
    }
  }

  async create(
    householdId: string,
    medicationId: string,
    storageLocationId: string,
    createMedicationBatchDto: CreateMedicationBatchDto,
  ) {
    await this.verifyMedicationBelongsToHousehold(
      householdId,
      medicationId,
      storageLocationId,
    );

    const [newBatch] = await this.db
      .insert(medicationBatches)
      .values({
        ...(createMedicationBatchDto as unknown as MedicationBatchesInsert),
        storageLocationId,
        medicationId,
      })
      .returning();
    return newBatch;
  }

  async findAllByBatches(
    householdId: string,
    storageLocationId: string,
    medicationId: string,
  ) {
    await this.verifyMedicationBelongsToHousehold(
      householdId,
      storageLocationId,
      medicationId,
    );
    return this.db
      .select()
      .from(medicationBatches)
      .where(eq(medicationBatches.id, medicationId))
      .orderBy(medications.brandName);
  }

  async findOne(
    householdId: string,
    storageLocationId: string,
    medicationId: string,
    id: string,
  ) {
    await this.verifyMedicationBelongsToHousehold(
      householdId,
      storageLocationId,
      medicationId,
    );
    const [batches] = await this.db
      .select()
      .from(medicationBatches)
      .where(
        and(
          eq(medicationBatches.id, id),
          eq(medicationBatches.medicationId, medicationId),
        ),
      );
    if (!batches) {
      throw new NotFoundException(
        `No existe el principio activo ${id} para el medicamento ${medicationId}`,
      );
    }
    return batches;
  }

  async update(
    householdId: string,
    storageLocationId: string,
    medicationId: string,
    id: string,
    updateDto: UpdateMedicationBatchDto,
  ) {
    await this.verifyMedicationBelongsToHousehold(
      householdId,
      storageLocationId,
      medicationId,
    );

    const [updatedBatches] = await this.db
      .update(medicationBatches)
      .set(updateDto as unknown as Partial<MedicationBatchesInsert>)
      .where(
        and(
          eq(medicationBatches.id, id),
          eq(medicationBatches.storageLocationId, storageLocationId),
          eq(medicationBatches.medicationId, medicationId),
        ),
      )
      .returning();

    if (!updatedBatches) {
      throw new NotFoundException(
        `No existe el principio activo ${id} para el medicamento ${medicationId}`,
      );
    }

    return updatedBatches;
  }

  async remove(
    householdId: string,
    storageLocationId: string,
    medicationId: string,
    id: string,
  ) {
    await this.verifyMedicationBelongsToHousehold(
      householdId,
      storageLocationId,
      medicationId,
    );
    const [removedBatches] = await this.db
      .delete(medicationBatches)
      .where(
        and(
          eq(medicationBatches.id, id),
          eq(medicationBatches.storageLocationId, storageLocationId),
          eq(medicationBatches.medicationId, medicationId),
        ),
      )
      .returning();
    if (!removedBatches) {
      throw new NotFoundException(
        `No existe el principio activo ${id} para el medicamento ${medicationId}`,
      );
    }
    return removedBatches;
  }
}
