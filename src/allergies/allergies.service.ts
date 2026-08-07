import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER } from '../../server/db/database.module';
import type { DrizzleClient } from '../../server/db/database.module';
import { allergies } from '../../server/db/schema';
import type { InferInsertModel } from 'drizzle-orm';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';

type AllergyInsert = InferInsertModel<typeof allergies>;

@Injectable()
export class AllergiesService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}

  async create(createAllergyDto: CreateAllergyDto) {
    const [newAllergy] = await this.db
      .insert(allergies)
      .values(createAllergyDto as unknown as AllergyInsert)
      .returning();
    return newAllergy;
  }

  async findAll() {
    return this.db
      .select()
      .from(allergies)
      .orderBy(allergies.familyMemberId, allergies.allergenName);
  }

  async findOne(id: string) {
    const [findOneAllergy] = await this.db
      .select()
      .from(allergies)
      .where(eq(allergies.id, id));
    if (!findOneAllergy) {
      throw new NotFoundException(`No existe el allergy con id ${id}`);
    }
    return findOneAllergy;
  }

  async update(id: string, updateAllergyDto: UpdateAllergyDto) {
    const [updatedAllergy] = await this.db
      .update(allergies)
      .set(updateAllergyDto as unknown as Partial<AllergyInsert>) // cast
      .where(eq(allergies.id, id))
      .returning();
    if (!updatedAllergy) {
      throw new NotFoundException(`No existe el allergies con id ${id}`);
    }
    return updatedAllergy;
  }

  async remove(id: string) {
    const [removeAllergy] = await this.db
      .delete(allergies)
      .where(eq(allergies.id, id))
      .returning();
    if (!removeAllergy) {
      throw new NotFoundException(`No existe el allergy con id ${id}`);
    }
    return removeAllergy;
  }
}
