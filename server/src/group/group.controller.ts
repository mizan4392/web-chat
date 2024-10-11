import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GlobalService } from 'src/global.service';
import { DEFAULT_GROUP_IMAGE_URL } from './constant';
import { AuthGuard, CurrentUser } from 'src/AuthGard';
import { User } from 'src/user/entities/user.entity';

@Controller('group')
@UseGuards(AuthGuard)
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly globalService: GlobalService,
  ) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createGroupDto: CreateGroupDto,
    @UploadedFile() file: any,
    @CurrentUser() user: User,
  ) {
    let imageUrl = '';
    if (file) {
      imageUrl = await this.globalService.storeImageAndGetUrl(
        file,
        DEFAULT_GROUP_IMAGE_URL,
      );
    }

    return this.groupService.create({ ...createGroupDto, imageUrl }, user);
  }
  @Post('join')
  async joinGroup(
    @Body('inviteCode') inviteCode: string,
    @CurrentUser() user: User,
  ) {
    return this.groupService.joinGroup(inviteCode, user.email);
  }

  @Get('user-groups')
  async getUserGroups(@CurrentUser() user: User) {
    return this.groupService.getUserGroups(user.email);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') groupId: string) {
    if (!groupId.trim()) {
      throw new BadRequestException('Group id is required');
    }
    return this.groupService.findOne(+groupId);
  }

  @Patch('generate-key')
  generateInviteKey(
    @CurrentUser() user: User,
    @Body('groupId') groupId: number,
  ) {
    return this.groupService.generateInviteKey(user.email, groupId);
  }

  @Post('update')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Body() updateGroupDto: UpdateGroupDto,
    @UploadedFile() file: any,
    @CurrentUser() user: User,
  ) {
    console.log('updateGroupDto', updateGroupDto);
    let imageUrl = '';
    if (file) {
      imageUrl = await this.globalService.storeImageAndGetUrl(
        file,
        DEFAULT_GROUP_IMAGE_URL,
      );
    }
    if (imageUrl.trim()) {
      updateGroupDto.imageUrl = imageUrl;
    }

    return this.groupService.update(updateGroupDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
