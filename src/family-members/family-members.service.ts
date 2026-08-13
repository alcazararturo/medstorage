import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER } from '../../server/db/database.module';
import type { DrizzleClient } from '../../server/db/database.module';
import { familyMembers } from '../../server/db/schema';
import type { InferInsertModel } from 'drizzle-orm';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family-member.dto';

type FamilyMembersInsert = InferInsertModel<typeof familyMembers>;

@Injectable()
export class FamilyMembersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}
  async create(
    householdId: string,
    createFamilyMemberDto: CreateFamilyMemberDto,
  ) {
    const [newFamilyMember] = await this.db
      .insert(familyMembers)
      .values({
        ...(createFamilyMemberDto as unknown as FamilyMembersInsert),
        householdId,
      })
      .returning();
    return newFamilyMember;
  }

  async findAllByHousehold(householdId: string) {
    return this.db
      .select()
      .from(familyMembers)
      .where(eq(familyMembers.householdId, householdId))
      .orderBy(familyMembers.fullName);
  }

  async findOne(householdId: string, id: string) {
    const [familyMember] = await this.db
      .select()
      .from(familyMembers)
      .where(
        and(
          eq(familyMembers.id, id),
          eq(familyMembers.householdId, householdId),
        ),
      );
    if (!familyMember) {
      throw new NotFoundException(
        `No existe el familiar con id ${id} en el hogar ${householdId}`,
      );
    }
    return familyMember;
  }

  async update(
    householdId: string,
    id: string,
    updateFamilyMemberDto: UpdateFamilyMemberDto,
  ) {
    const [updatedFamilyMember] = await this.db
      .update(familyMembers)
      .set(updateFamilyMemberDto as unknown as Partial<FamilyMembersInsert>)
      .where(
        and(
          eq(familyMembers.id, id),
          eq(familyMembers.householdId, householdId),
        ),
      )
      .returning();
    if (!updatedFamilyMember) {
      throw new NotFoundException(
        `No existe el familiar con id ${id} en el hogar ${householdId}`,
      );
    }
    return updatedFamilyMember;
  }

  async remove(householdId: string, id: string) {
    const [removedFamilyMember] = await this.db
      .delete(familyMembers)
      .where(
        and(
          eq(familyMembers.id, id),
          eq(familyMembers.householdId, householdId),
        ),
      )
      .returning();
    if (!removedFamilyMember) {
      throw new NotFoundException(
        `No existe el familiar con id ${id} en el hogar ${householdId}`,
      );
    }
    return removedFamilyMember;
  }
}
