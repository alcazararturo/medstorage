import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import {
  DRIZZLE_PROVIDER,
  DrizzleClient,
} from "../../server/db/database.module";
import { households } from "../../server/db/schema";
import { CreateHouseholdDto } from "./dto/create-household.dto";
import { UpdateHouseholdDto } from "./dto/update-household.dto";

@Injectable()
export class HouseholdsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}
  async create(createHouseholdDto: CreateHouseholdDto) {
    const [newHouseholds] = await this.db
      .insert(households)
      .values({
        ...createHouseholdDto,
      })
      .returning();
    return newHouseholds;
  }

  async findAll() {
    return this.db.select().from(households).orderBy(households.name);
  }

  async findOne(id: string) {
    const [findOneHouseholds] = await this.db
      .select()
      .from(households)
      .where(eq(households.id, id));
    if (!findOneHouseholds) {
      throw new NotFoundException(`No existe el households con id ${id}`);
    }
    return findOneHouseholds;
  }

  async update(id: string, updateHouseholdDto: UpdateHouseholdDto) {
    const [updatedHouseholds] = await this.db
      .update(households)
      .set({
        ...updateHouseholdDto,
      })
      .where(eq(households.id, id))
      .returning();
    if (!updatedHouseholds) {
      throw new NotFoundException(`No existe el households con id ${id}`);
    }
    return updatedHouseholds;
  }

  async remove(id: string) {
    const [removeHouseholds] = await this.db
      .delete(households)
      .where(eq(households.id, id))
      .returning();
    if (!removeHouseholds) {
      throw new NotFoundException(
        `No existe el lote de medicamento con id ${id}`,
      );
    }
    return removeHouseholds;
  }
}
