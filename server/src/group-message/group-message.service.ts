import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateGroupMessageDto,
  SendFileDto,
} from './dto/create-group-message.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { GroupMessage } from './entities/group-message.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

import { GroupMembersService } from 'src/group-members/group-members.service';
import { ChatGateway } from './chat-gateway';
import { getFileType } from 'src/group/constant';

@Injectable()
export class GroupMessageService {
  constructor(
    @InjectRepository(GroupMessage)
    private groupMessageRepository: Repository<GroupMessage>,
    private userService: UserService,
    private groupMemberService: GroupMembersService,
    private chatGetWay: ChatGateway,
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

    const saved = await this.groupMessageRepository.save(createGroupData);
    const message = await this.groupMessageRepository.findOne({
      where: {
        id: saved.id,
      },
      relations: ['user'],
    });
    this.chatGetWay.server
      .to(createGroupMessageDto.groupId?.toString())
      .emit('receiveMessage', message);

    return message;
  }

  fetchGroupMessages(groupId: number, page: number) {
    return this.groupMessageRepository.find({
      where: {
        groupId,
      },
      take: 20,
      skip: 20 * (page - 1),
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findAll() {
    return `This action returns all groupMessage`;
  }

  async sendFiles(data: SendFileDto, imageUrl: string, email: string) {
    const userExist = await this.userService.findUserByEmail(email);
    const groupExist = await this.groupMemberService.findOne(userExist.id);

    if (groupExist?.groupId !== Number(data.groupId)) {
      throw new BadRequestException('User not in group');
    }
    const fileType = getFileType(imageUrl);

    const createGroupData: GroupMessage = {
      ...data,
      userId: userExist.id,
      createdAt: new Date().toISOString(),
      imageUrl,
      fileType,
    };

    const saved = await this.groupMessageRepository.save(createGroupData);
    const message = await this.groupMessageRepository.findOne({
      where: {
        id: saved.id,
      },
      relations: ['user'],
    });
    this.chatGetWay.server
      .to(groupExist.groupId?.toString())
      .emit('receiveMessage', message);

    return message;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupMessage`;
  }
}
