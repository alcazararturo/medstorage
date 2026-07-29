import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER, DrizzleClient } from "../../server/db/database.module";
import { medicationBatches } from "../../server/db/schema";
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
        ...createMedicationBatchDto,        
        quantity: createMedicationBatchDto.quantity.toString(), 
      })
      .returning();
    return newBatch;
  }

  async findAll() {
    const [findBatch] = await this.db
    .select().from(medicationBatches).orderBy(medicationBatches.expirationDate);
    return findBatch;
  }

  async findOne(id: string) {
    const [findOneBatch] = await this.db
    .select().from(medicationBatches).where(eq(medicationBatches.id, id));
    if (!findOneBatch) {
      throw new NotFoundException(`No existe el lote de medicamento con id ${id}`,); 
    }
    return findOneBatch;
  }

  async update(id: string, updateMedicationBatchDto: UpdateMedicationBatchDto) {
    const [updatedBatch] = await this.db
      .update(medicationBatches)
      .set({
        ...updateMedicationBatchDto,
        quantity: updateMedicationBatchDto.quantity ? updateMedicationBatchDto.quantity.toString() : undefined,
      })
      .where(eq(medicationBatches.id, id))
      .returning();
      if (!updatedBatch) {
        throw new NotFoundException(`No existe el lote de medicamento con id ${id}`,);
      }
    return updatedBatch;
  }

  async remove(id: string) {
    const [removeBatch] = await this.db.delete(medicationBatches)
    .where(eq(medicationBatches.id, id))
    .returning();
    if (!removeBatch) {
      `No existe el lote de medicamento con id ${id}`,
    }
    return removeBatch;
  }
}

