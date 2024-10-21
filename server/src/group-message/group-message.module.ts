import { Module } from '@nestjs/common';
import { GroupMessageService } from './group-message.service';
import { GroupMessageController } from './group-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMessage } from './entities/group-message.entity';
import { UserModule } from 'src/user/user.module';

import { GroupMembersModule } from 'src/group-members/group-members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupMessage]),
    UserModule,
    GroupMembersModule,
  ],
  controllers: [GroupMessageController],
  providers: [GroupMessageService],
})
export class GroupMessageModule {}
