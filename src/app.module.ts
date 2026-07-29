import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "../server/db/database.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MedicationBatchesModule } from "./medication-batches/medication-batches.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    DatabaseModule,
    MedicationBatchesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
