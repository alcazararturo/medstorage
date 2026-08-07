import { createZodDto } from 'nestjs-zod';
import { StorageLocationsSchema } from './create-storage-location.dto';

export class UpdateStorageLocationDto extends createZodDto(
  StorageLocationsSchema.partial(),
) {}
