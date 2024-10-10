import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupMembersModule } from 'src/group-members/group-members.module';
import { UserModule } from 'src/user/user.module';
import { GroupMember } from 'src/group-members/entities/group-member.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, GroupMember, User]),
    GroupMembersModule,
    UserModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
