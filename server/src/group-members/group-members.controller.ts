import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GroupMembersService } from './group-members.service';
import {
  CreateGroupMemberDto,
  PromoteToModeratorDto,
} from './dto/create-group-member.dto';
import { AuthGuard, CurrentUser } from 'src/AuthGard';
import { User } from 'src/user/entities/user.entity';

@Controller('group-members')
@UseGuards(AuthGuard)
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}

  @Post()
  create(@Body() createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMembersService.create(createGroupMemberDto);
  }

  @Post('promotion')
  promoteToModerator(
    @Body() createGroupMemberDto: PromoteToModeratorDto,
    @CurrentUser() user: User,
  ) {
    return this.groupMembersService.promoteToModerator(
      createGroupMemberDto,
      user,
    );
  }

  @Get()
  findAll() {
    return this.groupMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupMembersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupMembersService.remove(+id);
  }
}
