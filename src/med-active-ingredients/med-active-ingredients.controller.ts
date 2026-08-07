import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedActiveIngredientsService } from './med-active-ingredients.service';
import { CreateMedActiveIngredientDto } from './dto/create-med-active-ingredient.dto';
import { UpdateMedActiveIngredientDto } from './dto/update-med-active-ingredient.dto';
import { ParamsDto } from '../util/dto/paramsSchema';

@Controller('med-active-ingredients')
export class MedActiveIngredientsController {
  constructor(
    private readonly medActiveIngredientsService: MedActiveIngredientsService,
  ) {}

  @Post()
  create(@Body() createMedActiveIngredientDto: CreateMedActiveIngredientDto) {
    return this.medActiveIngredientsService.create(
      createMedActiveIngredientDto,
    );
  }

  @Get()
  findAll() {
    return this.medActiveIngredientsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: ParamsDto) {
    return this.medActiveIngredientsService.findOne(params.id);
  }

  @Patch(':id')
  update(
    @Param() params: ParamsDto,
    @Body() updateMedActiveIngredientDto: UpdateMedActiveIngredientDto,
  ) {
    return this.medActiveIngredientsService.update(
      params.id,
      updateMedActiveIngredientDto,
    );
  }

  @Delete(':id')
  remove(@Param() params: ParamsDto) {
    return this.medActiveIngredientsService.remove(params.id);
  }
}
