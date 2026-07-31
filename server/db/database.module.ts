import { Module, Global } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const DRIZZLE_PROVIDER = "DRIZZLE_PROVIDER";

export type DrizzleClient = ReturnType<typeof drizzle>;

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE_PROVIDER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.getOrThrow<string>("DATABASE_URL");
        const sql = neon(databaseUrl);

        return drizzle({ client: sql, schema });
      },
    },
  ],
  exports: [DRIZZLE_PROVIDER],
})
export class DatabaseModule {}
