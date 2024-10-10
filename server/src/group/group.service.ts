import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { User } from 'src/user/entities/user.entity';
import { Group } from './entities/group.entity';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupMembersService } from 'src/group-members/group-members.service';
import { Member_Role } from 'src/group-members/entities/group-member.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    private groupMembersService: GroupMembersService,
    private userService: UserService,
  ) {}
  async create(createGroupDto: CreateGroupDto, user: User) {
    const userExist = await this.userService.findUserByEmail(user.email);
    const inviteCode = uuidv4();
    const createGroupData: Group = {
      ...createGroupDto,
      owner: userExist,
      inviteCode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      const group = await this.groupRepository.save(createGroupData);
      await this.groupMembersService.create({
        userId: userExist.id,
        groupId: group.id,
        role: Member_Role.ADMIN,
      });
      return group;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.message);
    }
  }

  async getUserGroups(email: string) {
    const userExist = await this.userService.findUserByEmail(email);
    if (!userExist) {
      throw new BadRequestException('User not found');
    }
    return this.groupRepository.find({
      where: {
        owner: userExist,
      },
    });
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
