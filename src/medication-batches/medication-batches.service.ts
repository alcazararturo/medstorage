import { Injectable, Inject } from "@nestjs/common";
import { DRIZZLE_PROVIDER } from "../../server/db/database.module";
import { neon } from "@neondatabase/serverless";
import { CreateMedicationBatchDto } from "./dto/create-medication-batch.dto";
import { UpdateMedicationBatchDto } from "./dto/update-medication-batch.dto";

@Injectable()
export class MedicationBatchesService {
  create(createMedicationBatchDto: CreateMedicationBatchDto) {
    return "This action adds a new medicationBatch";
  }

  findAll() {
    return `This action returns all medicationBatches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicationBatch`;
  }

  update(id: number, updateMedicationBatchDto: UpdateMedicationBatchDto) {
    return `This action updates a #${id} medicationBatch`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicationBatch`;
  }
}

/*
import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { medicationBatches } from '../../db/schema';
import { CreateMedicationBatchDto } from './create-medication-batch.dto';
import { UpdateMedicationBatchDto } from './update-medication-batch.dto';

@Injectable()
export class MedicationBatchesService {
  // Asumiendo que inyectas tu proveedor de Drizzle mapeado a Neon
  constructor(@Inject('NEON_DB') private readonly db: any) {}

  async create(createDto: CreateMedicationBatchDto) {
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

  async update(id: string, updateDto: UpdateMedicationBatchDto) {
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
}

*/
