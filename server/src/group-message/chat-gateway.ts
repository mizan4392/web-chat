import { Injectable, UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { WebSocketGuard } from 'src/WebSocketGard';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  path: '/api/socket.io',
})
@UseGuards(WebSocketGuard)
@Injectable()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinGroup')
  handleJoinGroup(socket: Socket, groupId: string): void {
    console.log(`Socket ${socket.id} joining group ${groupId}`);
    socket.join(groupId);
  }

  @SubscribeMessage('sendMessageToGroup')
  async handleSendMessageToGroup(
    socket: Socket,
    { groupId, message }: { groupId: string; message: string },
    // @CurrentUser() user: User,
  ): Promise<void> {
    console.log(`Received message for group ${groupId}: ${message}`);
    await this.server.to(groupId).emit('receiveMessage', message);
  }
}
