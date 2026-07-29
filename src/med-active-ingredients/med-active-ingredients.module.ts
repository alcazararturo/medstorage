import { Module } from '@nestjs/common';
import { MedActiveIngredientsService } from './med-active-ingredients.service';
import { MedActiveIngredientsController } from './med-active-ingredients.controller';

@Module({
  controllers: [MedActiveIngredientsController],
  providers: [MedActiveIngredientsService],
})
export class MedActiveIngredientsModule {}
