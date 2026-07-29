import { PartialType } from '@nestjs/mapped-types';
import { CreateMedActiveIngredientDto } from './create-med-active-ingredient.dto';

export class UpdateMedActiveIngredientDto extends PartialType(CreateMedActiveIngredientDto) {}
