import { CloudinaryModule } from './../cloudinary.module';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AuthGuard } from './AuthGard';
import { JwtService } from '@nestjs/jwt';
import { GlobalService } from './global.service';

import { WebSocketGuard } from './WebSocketGard';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '9001', 10),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'web_chat',
  autoLoadEntities: true,
  synchronize: true,
};
console.log('db config', dbConfig);

@Global()
@Module({
  imports: [TypeOrmModule.forRoot({ ...dbConfig }), CloudinaryModule],
  providers: [AuthGuard, JwtService, GlobalService, WebSocketGuard],
  exports: [AuthGuard, JwtService, GlobalService, WebSocketGuard],
})
export class GlobalModule {}
