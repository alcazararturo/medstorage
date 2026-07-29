import { Injectable, Inject } from "@nestjs/common";
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER } from "../../server/db/database.module";
import { DrizzleClient } from "../../server/db/database.module";
import { CreateMedicationBatchDto } from "./dto/create-medication-batch.dto";
import { UpdateMedicationBatchDto } from "./dto/update-medication-batch.dto";

@Injectable()
export class MedicationBatchesService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient
  )
  async create(createMedicationBatchDto: CreateMedicationBatchDto) {
    const [newBatch] = await this.db
      .insert(medicationBatches)
      .values({
        ...createDto,
        // Drizzle necesita guardar el decimal como string en Postgres
        quantity: createDto.quantity.toString(), 
      })
      .returning();
    return newBatch;
  }

  async findAll() {
    const [findBatch] = await this.db
    .select().from(medicationBatches).orderBy(medicationBatches.expirationDate)
    .returning();
    return findBatch;
  }

  async findOne(id: string) {
    const [findOneBatch] = await this.db
    .select().from(medicationBatches).where(eq(medicationBatches.id, id))
    .returning();
    return findOneBatch;
  }

  async update(id: string, updateMedicationBatchDto: UpdateMedicationBatchDto) {
    const [updatedBatch] = await this.db
      .update(medicationBatches)
      .set({
        ...updateDto,
        quantity: updateDto.quantity ? updateDto.quantity.toString() : undefined,
      })
      .where(eq(medicationBatches.id, id))
      .returning();
    return updatedBatch;
  }

  remove(id: string) {
    const [removeBatch] = await db.delete(medicationBatches)
    .where(eq(medicationBatches.id, id))
    .returning();
    return removeBatch;
  }
}

