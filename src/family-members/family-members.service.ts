import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DRIZZLE_PROVIDER } from "../../server/db/database.module";
import type { DrizzleClient } from "../../server/db/database.module";
import { familyMembers } from "../../server/db/schema";
import type { InferInsertModel } from "drizzle-orm";
import { CreateFamilyMemberDto } from "./dto/create-family-member.dto";
import { UpdateFamilyMemberDto } from "./dto/update-family-member.dto";

type FamilyMembersInsert = InferInsertModel<typeof familyMembers>;

@Injectable()
export class FamilyMembersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}
  async create(createFamilyMemberDto: CreateFamilyMemberDto) {
    const [newFamilyMember] = await this.db
      .insert(familyMembers)
      .values(createFamilyMemberDto as unknown as FamilyMembersInsert)
      .returning();
    return newFamilyMember;
  }

  async findAll() {
    return this.db.select().from(familyMembers).orderBy(familyMembers.fullName);
  }

  async findOne(id: string) {
    const [findOneFamilyMember] = await this.db
      .select()
      .from(familyMembers)
      .where(eq(familyMembers.id, id));
    if (!findOneFamilyMember) {
      throw new NotFoundException(`No existe el familiar con id ${id}`);
    }
    return findOneFamilyMember;
  }

  async update(id: string, updateFamilyMemberDto: UpdateFamilyMemberDto) {
    const [updatedFamilyMember] = await this.db
      .update(familyMembers)
      .set(updateFamilyMemberDto as unknown as Partial<FamilyMembersInsert>) // cast
      .where(eq(familyMembers.id, id))
      .returning();
    if (!updatedFamilyMember) {
      throw new NotFoundException(`No existe el familiar con id ${id}`);
    }
    return updatedFamilyMember;
  }

  async remove(id: string) {
    const [removeFamilyMember] = await this.db
      .delete(familyMembers)
      .where(eq(familyMembers.id, id))
      .returning();
    if (!removeFamilyMember) {
      throw new NotFoundException(`No existe el familiar con id ${id}`);
    }
    return removeFamilyMember;
  }
}
