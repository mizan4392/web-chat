import { Module } from '@nestjs/common';
import { GroupMessageService } from './group-message.service';
import { GroupMessageController } from './group-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMessage } from './entities/group-message.entity';
import { UserModule } from 'src/user/user.module';

import { GroupMembersModule } from 'src/group-members/group-members.module';
import { ChatGateway } from './chat-gateway';
import { GlobalModule } from 'src/global.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupMessage]),
    UserModule,
    GroupMembersModule,
    GlobalModule,
  ],
  controllers: [GroupMessageController],
  providers: [GroupMessageService, ChatGateway],
})
export class GroupMessageModule {}
