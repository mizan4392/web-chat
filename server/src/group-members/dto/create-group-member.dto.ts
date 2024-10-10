import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGroupMemberDto {
  @IsOptional()
  userId: number;
  @IsNotEmpty()
  groupId: number;
  @IsOptional()
  role: string;
}
