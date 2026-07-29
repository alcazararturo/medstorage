import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER, DrizzleClient } from "../../server/db/database.module";
import { familyMembers } from "../../server/db/schema";
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family-member.dto';

@Injectable()
export class FamilyMembersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient
  )
  async create(createFamilyMemberDto: CreateFamilyMemberDto) {
    const [newBatch] = await this.db
      .insert(familyMembers)
      .values({
        ...createFamilyMemberDto,
      })
      .returning();
    return newBatch;
  }

  async findAll() {
    const [findBatch] = await this.db
    .select().from(familyMembers).orderBy(familyMembers.fullName);
    return findBatch;
  }

  async findOne(id: string) {
    const [findOneBatch] = await this.db
    .select().from(familyMembers).where(eq(familyMembers.id, id));
    if (!findOneBatch) {
      throw new NotFoundException(`No existe el familiar con id ${id}`,); 
    }
    return findOneBatch;
  }

  async update(id: string, updateFamilyMemberDto: UpdateFamilyMemberDto) {
    const [updatedBatch] = await this.db
      .update(familyMembers)
      .set({
        ...updateFamilyMemberDto,
      })
      .where(eq(familyMembers.id, id))
      .returning();
      if (!updatedBatch) {
        throw new NotFoundException(`No existe el familiar con id ${id}`,);
      }
    return updatedBatch;
  }

  async remove(id: string) {
    const [removeBatch] = await this.db.delete(familyMembers)
    .where(eq(familyMembers.id, id))
    .returning();
    if (!removeBatch) {
      `No existe el familiar con id ${id}`,
    }
    return removeBatch;
  }
}
