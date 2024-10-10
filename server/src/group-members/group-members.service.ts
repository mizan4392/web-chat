import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { GroupMember, Member_Role } from './entities/group-member.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class GroupMembersService {
  constructor(
    @InjectRepository(GroupMember)
    private groupMemberRepository: Repository<GroupMember>,
  ) {}
  create(createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMemberRepository.save(createGroupMemberDto);
  }
  getGroupMembers(groupId: number) {
    return this.groupMemberRepository.find({
      where: {
        groupId,
      },
      relations: ['user'],
    });
  }
  getGroupsByUser(userId: number) {
    return this.groupMemberRepository.find({
      where: {
        userId: userId,
        role: Not(Member_Role.ADMIN),
      },
      relations: ['group'],
    });
  }

  findAll() {
    return `This action returns all groupMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupMember`;
  }

  async addMember(groupId: number, userId: number) {
    const member = await this.groupMemberRepository.findOne({
      where: {
        groupId,
        userId,
      },
    });
    if (member) {
      throw new BadRequestException('User already a member of this group');
    }
    return this.groupMemberRepository.save({
      groupId,
      userId,
      role: Member_Role.MEMBER,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} groupMember`;
  }
}
