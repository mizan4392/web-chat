import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGroupDto {
  @IsOptional()
  groupId?: number;
  @IsNotEmpty()
  name: string;
  @IsOptional()
  imageUrl?: string;
}
