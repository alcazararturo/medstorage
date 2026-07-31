import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DRIZZLE_PROVIDER } from "../../server/db/database.module";
import type { DrizzleClient } from "../../server/db/database.module";
import { households } from "../../server/db/schema";
import type { InferInsertModel } from "drizzle-orm";
import { CreateHouseholdDto } from "./dto/create-household.dto";
import { UpdateHouseholdDto } from "./dto/update-household.dto";

type HouseholdsInsert = InferInsertModel<typeof households>;

@Injectable()
export class HouseholdsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzleClient,
  ) {}
  async create(createHouseholdDto: CreateHouseholdDto) {
    const [newHouseholds] = await this.db
      .insert(households)
      .values(createHouseholdDto as unknown as HouseholdsInsert)
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
      .set(updateHouseholdDto as unknown as Partial<HouseholdsInsert>) // cast
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
