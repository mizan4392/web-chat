import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupMessageDto } from './dto/create-group-message.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { GroupMessage } from './entities/group-message.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

import { GroupMembersService } from 'src/group-members/group-members.service';

@Injectable()
export class GroupMessageService {
  constructor(
    @InjectRepository(GroupMessage)
    private groupRepository: Repository<GroupMessage>,
    private userService: UserService,
    private groupMemberService: GroupMembersService,
  ) {}
  async create(createGroupMessageDto: CreateGroupMessageDto, email: string) {
    const userExist = await this.userService.findUserByEmail(email);
    const groupExist = await this.groupMemberService.findOne(userExist.id);
    if (groupExist?.groupId !== createGroupMessageDto.groupId) {
      throw new BadRequestException('User not in group');
    }
    const createGroupData: GroupMessage = {
      ...createGroupMessageDto,
      userId: userExist.id,
      createdAt: new Date().toISOString(),
    };
    return this.groupRepository.save(createGroupData);
  }

  fetchGroupMessages(groupId: number, page: number) {
    return this.groupRepository.find({
      where: {
        groupId,
      },
      take: 10,
      skip: 10 * (page - 1),
      relations: ['user'],
    });
  }

  findAll() {
    return `This action returns all groupMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupMessage`;
  }
}
