import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GroupMessageService } from './group-message.service';
import { CreateGroupMessageDto } from './dto/create-group-message.dto';

import { AuthGuard, CurrentUser } from 'src/AuthGard';
import { User } from 'src/user/entities/user.entity';

@Controller('group-message')
@UseGuards(AuthGuard)
export class GroupMessageController {
  constructor(private readonly groupMessageService: GroupMessageService) {}

  @Post()
  create(
    @Body() createGroupMessageDto: CreateGroupMessageDto,
    @CurrentUser() user: User,
  ) {
    return this.groupMessageService.create(createGroupMessageDto, user.email);
  }

  @Get('fetch/:groupId/:page')
  fetchGroupMessages(
    @Param('groupId') groupId: string,
    @Param('page') page: string,
  ) {
    return this.groupMessageService.fetchGroupMessages(+groupId, +page);
  }

  @Get()
  findAll() {
    return this.groupMessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupMessageService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupMessageService.remove(+id);
  }
}
