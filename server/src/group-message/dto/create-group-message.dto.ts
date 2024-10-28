import { IsNotEmpty } from 'class-validator';

export class CreateGroupMessageDto {
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  groupId: number;
}

export class SendFileDto {
  @IsNotEmpty()
  groupId: number;
}
