import { Module } from "@nestjs/common";
import { DatabaseModule } from "../server/db/database.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MedicationBatchesModule } from "./medication-batches/medication-batches.module";

@Module({
  imports: [DatabaseModule, MedicationBatchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
