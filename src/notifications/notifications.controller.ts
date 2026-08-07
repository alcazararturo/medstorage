import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ParamsDto } from '../util/dto/paramsSchema';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: ParamsDto) {
    return this.notificationsService.findOne(params.id);
  }

  @Patch(':id')
  update(
    @Param() params: ParamsDto,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(params.id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param() params: ParamsDto) {
    return this.notificationsService.remove(params.id);
  }
}
