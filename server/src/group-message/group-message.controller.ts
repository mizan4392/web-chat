import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { GroupMessageService } from './group-message.service';
import {
  CreateGroupMessageDto,
  SendFileDto,
} from './dto/create-group-message.dto';

import { AuthGuard, CurrentUser } from 'src/AuthGard';
import { User } from 'src/user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { GlobalService } from 'src/global.service';
import { GROUP_IMAGE_URL } from 'src/group/constant';

@Controller('group-message')
@UseGuards(AuthGuard)
export class GroupMessageController {
  constructor(
    private readonly groupMessageService: GroupMessageService,
    private readonly globalService: GlobalService,
  ) {}

  @Post()
  create(
    @Body() createGroupMessageDto: CreateGroupMessageDto,
    @CurrentUser() user: User,
  ) {
    return this.groupMessageService.create(createGroupMessageDto, user.email);
  }

  @Post('send-file')
  @UseInterceptors(FileInterceptor('file'))
  async sendFiles(
    @Body() data: SendFileDto,
    @UploadedFile() file: any,
    @CurrentUser() user: User,
  ) {
    let uploadResponse;
    if (file) {
      uploadResponse = await this.globalService.uploadBufferFileToCloudinary(
        file,
        `${GROUP_IMAGE_URL}/${data.groupId}/attachments`,
      );
    }

    return this.groupMessageService.sendFiles(
      data,
      uploadResponse?.url,
      user.email,
    );
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
