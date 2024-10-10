import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  imageUrl?: string;
}
