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
})
@UseGuards(WebSocketGuard)
@Injectable()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinGroup')
  handleJoinGroup(socket: Socket, groupId: string): void {
    console.log('socketId=>>', socket.id);
    console.log('group=>>', groupId);
    console.log('=============');
    socket.join(groupId);
  }

  @SubscribeMessage('sendMessageToGroup')
  async handleSendMessageToGroup(
    socket: Socket,
    { groupId, message }: { groupId: string; message: string },
    // @CurrentUser() user: User,
  ): Promise<void> {
    console.log('socketId=>>', socket.id);
    console.log('groupId=>>', groupId);
    console.log('message=>>', message);
    // console.log('user=>>', user);
    // const savedMessage = await this.groupMessageService.create(
    //   {
    //     groupId: parseInt(groupId),
    //     message,
    //   },
    //   user.email,
    // );
    // console.log('savedMessage', savedMessage);
    this.server.to(groupId).emit('receiveMessage', '');
  }
}
