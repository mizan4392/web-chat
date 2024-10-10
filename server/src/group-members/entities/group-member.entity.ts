import { Group } from 'src/group/entities/group.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export const Member_Role = {
  ADMIN: 'admin',
  MEMBER: 'member',
  MODERATOR: 'moderator',
};
@Entity()
export class GroupMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User)
  user: User;

  @ManyToMany(() => Group)
  group: Group;

  @Column()
  groupId: number;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: Member_Role, default: Member_Role.MEMBER })
  role: string;
}
