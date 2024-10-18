import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateGroupMemberDto,
  KickMemberDto,
  PromoteToModeratorDto,
} from './dto/create-group-member.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { GroupMember, Member_Role } from './entities/group-member.entity';
import { Not, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GroupMembersService {
  constructor(
    @InjectRepository(GroupMember)
    private groupMemberRepository: Repository<GroupMember>,
    private userService: UserService,
  ) {}
  create(createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMemberRepository.save(createGroupMemberDto);
  }
  async promoteToModerator(createGroupMemberDto: PromoteToModeratorDto, user) {
    const currentUser = await this.userService.findUserByEmail(user.email);

    const userGroup = await this.groupMemberRepository.findOne({
      where: {
        groupId: createGroupMemberDto.groupId,
      },
      relations: ['group'],
    });
    if (!userGroup) {
      throw new BadRequestException('Group not found');
    }
    const currentUserGroup = await this.groupMemberRepository.findOne({
      where: {
        groupId: createGroupMemberDto.groupId,
        userId: currentUser.id,
      },
    });
    if (currentUserGroup?.role !== Member_Role.ADMIN) {
      throw new BadRequestException('Only Admin can promote to moderator');
    }
    try {
      await this.groupMemberRepository.update(
        {
          groupId: createGroupMemberDto.groupId,
          userId: createGroupMemberDto.userId,
        },
        {
          role: Member_Role.MODERATOR,
        },
      );
      return true;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async kickMember(data: KickMemberDto, email: string) {
    const currentUser = await this.userService.findUserByEmail(email);
    const userGroup = await this.groupMemberRepository.findOne({
      where: {
        groupId: data.groupId,
      },
      relations: ['group'],
    });
    if (!userGroup) {
      throw new BadRequestException('Group not found');
    }
    const currentUserGroup = await this.groupMemberRepository.findOne({
      where: {
        groupId: data.groupId,
        userId: currentUser.id,
      },
    });

    if (
      currentUserGroup?.role !== Member_Role.ADMIN &&
      currentUserGroup?.role !== Member_Role.MODERATOR
    ) {
      throw new BadRequestException(
        'Only admin or moderator can kick a member',
      );
    }
    try {
      await this.groupMemberRepository.delete({
        groupId: data.groupId,
        userId: data.userId,
      });

      //TODO: delete all user message in the group or update the message to show user has been kicked
      return true;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
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
  getGroupMemberByUserId(groupId: number, userId: number) {
    return this.groupMemberRepository.findOne({
      where: {
        groupId,
        userId,
      },
    });
  }
}
