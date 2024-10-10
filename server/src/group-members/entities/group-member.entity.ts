import { Group } from 'src/group/entities/group.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export const Member_Role = {
  ADMIN: 'admin',
  MEMBER: 'member',
  MODERATOR: 'moderator',
};
@Entity()
export class GroupMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group, (group) => group.members)
  group: Group;

  @Column()
  groupId: number;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: Member_Role, default: Member_Role.MEMBER })
  role: string;

  @ManyToOne(() => User, (user) => user.groupMembers) // Assuming you have a User entity
  user: User;
}
