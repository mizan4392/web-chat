import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './global.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GroupMembersModule } from './group-members/group-members.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    TypeOrmModule.forFeature([User]),
    GlobalModule,
    UserModule,
    GroupModule,
    GroupMembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
