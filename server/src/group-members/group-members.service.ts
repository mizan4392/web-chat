import { Injectable } from '@nestjs/common';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { UpdateGroupMemberDto } from './dto/update-group-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMember } from './entities/group-member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupMembersService {
  constructor(
    @InjectRepository(GroupMember)
    private groupMemberRepository: Repository<GroupMember>,
  ) {}
  create(createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMemberRepository.save(createGroupMemberDto);
  }

  findAll() {
    return `This action returns all groupMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupMember`;
  }

  update(id: number, updateGroupMemberDto: UpdateGroupMemberDto) {
    return `This action updates a #${id} groupMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupMember`;
  }
}
