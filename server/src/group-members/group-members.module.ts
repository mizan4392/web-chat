import { Module } from '@nestjs/common';
import { GroupMembersService } from './group-members.service';
import { GroupMembersController } from './group-members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMember } from './entities/group-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupMember])],
  controllers: [GroupMembersController],
  providers: [GroupMembersService],
  exports: [GroupMembersService],
})
export class GroupMembersModule {}
