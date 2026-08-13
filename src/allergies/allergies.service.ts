import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
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

  async create(familyMemberId: string, createAllergyDto: CreateAllergyDto) {
    const [newAllergy] = await this.db
      .insert(allergies)
      .values({
        ...(createAllergyDto as unknown as AllergyInsert),
        familyMemberId,
      })
      .returning();
    return newAllergy;
  }

  async findAllByFamilyMember(familyMemberId: string) {
    return this.db
      .select()
      .from(allergies)
      .where(eq(allergies.familyMemberId, familyMemberId))
      .orderBy(allergies.allergenName);
  }

  async findOne(familyMemberId: string, id: string) {
    const [allergy] = await this.db
      .select()
      .from(allergies)
      .where(
        and(eq(allergies.id, id), eq(allergies.familyMemberId, familyMemberId)),
      );
    if (!allergy) {
      throw new NotFoundException(
        `No existe la alergia con id ${id} para el familiar ${familyMemberId}`,
      );
    }
    return allergy;
  }

  async update(
    familyMemberId: string,
    id: string,
    updateAllergyDto: UpdateAllergyDto,
  ) {
    const [updatedAllergy] = await this.db
      .update(allergies)
      .set(updateAllergyDto as unknown as Partial<AllergyInsert>)
      .where(
        and(eq(allergies.id, id), eq(allergies.familyMemberId, familyMemberId)),
      )
      .returning();
    if (!updatedAllergy) {
      throw new NotFoundException(
        `No existe la alergia con id ${id} para el familiar ${familyMemberId}`,
      );
    }
    return updatedAllergy;
  }

  async remove(familyMemberId: string, id: string) {
    const [removedAllergy] = await this.db
      .delete(allergies)
      .where(
        and(eq(allergies.id, id), eq(allergies.familyMemberId, familyMemberId)),
      )
      .returning();
    if (!removedAllergy) {
      throw new NotFoundException(
        `No existe la alergia con id ${id} para el familiar ${familyMemberId}`,
      );
    }
    return removedAllergy;
  }
}
