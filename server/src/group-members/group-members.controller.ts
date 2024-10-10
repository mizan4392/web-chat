import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GroupMembersService } from './group-members.service';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';

@Controller('group-members')
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}

  @Post()
  create(@Body() createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMembersService.create(createGroupMemberDto);
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
