import { GroupMember } from 'src/group-members/entities/group-member.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  imageUrl?: string;

  @Column({ type: 'text', nullable: true })
  inviteCode?: string;

  @ManyToOne(() => User, (user) => user.groups)
  owner: User;

  @Column({ type: 'text', nullable: true })
  createdAt: string;

  @Column({ type: 'text', nullable: true })
  updatedAt: string;

  @ManyToMany(() => GroupMember, (members) => members.user, {
    onDelete: 'CASCADE',
  })
  members?: GroupMember[];
}
