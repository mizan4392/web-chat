import { IsNotEmpty } from 'class-validator';

export class CreateGroupMessageDto {
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  groupId: number;
}
