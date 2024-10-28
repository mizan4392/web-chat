import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from './user/entities/user.entity';

import { WsException } from '@nestjs/websockets';

@Injectable()
export class WebSocketGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();

    const [type, token] =
      client.handshake.headers.authorization?.split(' ') ?? [];
    if (!token?.length) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        publicKey: process.env.JWT_PUBLIC_KEY,
        algorithms: ['RS256'],
      });
      console.log(payload);
      client['user'] = {
        email: payload.email,
        name: payload.name,
        imageUrl: payload.imageUrl,
      };
    } catch (e) {
      console.log('error=>>>>>', e);
      throw new WsException('Unauthorized');
    }
    return true;
  }
}

export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<User> => {
    const request = ctx.switchToWs().getClient();
    console.log('request', request);
    return request.user;
  },
);