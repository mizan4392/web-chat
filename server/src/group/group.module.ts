import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupMembersModule } from 'src/group-members/group-members.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), GroupMembersModule, UserModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
