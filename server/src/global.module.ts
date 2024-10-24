import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './database.config';
import { User } from './user/entities/user.entity';
import { AuthGuard } from './AuthGard';
import { JwtService } from '@nestjs/jwt';
import { GlobalService } from './global.service';
import { Group } from './group/entities/group.entity';
import { GroupMember } from './group-members/entities/group-member.entity';
import { GroupMessage } from './group-message/entities/group-message.entity';
import { WebSocketGuard } from './WebSocketGard';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [User, Group, GroupMember, GroupMessage],
    }),
  ],
  providers: [AuthGuard, JwtService, GlobalService, WebSocketGuard],
  exports: [AuthGuard, JwtService, GlobalService, WebSocketGuard],
})
export class GlobalModule {}
