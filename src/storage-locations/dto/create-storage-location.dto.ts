import { createInsertSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
// import { z } from 'zod';
import { storageLocations } from '../../../server/db/schema';

export const StorageLocationsSchema = createInsertSchema(storageLocations);

export class CreateStorageLocationDto extends createZodDto(
  StorageLocationsSchema,
) {}
