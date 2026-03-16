import { CloudinaryModule } from './../cloudinary.module';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from './AuthGard';
import { JwtService } from '@nestjs/jwt';
import { GlobalService } from './global.service';

import { WebSocketGuard } from './WebSocketGard';

@Global()
@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url: DB_URL,
    //   ssl: {
    //     rejectUnauthorized: false, // Allows self-signed certificates (sufficient for Aiven)
    //   },
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   entities: [User, Group, GroupMember, GroupMessage],
    // }),
    TypeOrmModule.forRoot({
      type: (process.env.DATABASE_TYPE as any) || 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'web_chat',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CloudinaryModule,
  ],
  providers: [AuthGuard, JwtService, GlobalService, WebSocketGuard],
  exports: [AuthGuard, JwtService, GlobalService, WebSocketGuard],
})
export class GlobalModule {}
