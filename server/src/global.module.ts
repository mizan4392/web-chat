import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './database.config';
import { User } from './user/entities/user.entity';
import { AuthGuard } from './AuthGard';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot({ ...dbConfig, entities: [User] })],
  providers: [AuthGuard, JwtService],
  exports: [AuthGuard, JwtService],
})
export class GlobalModule {}
