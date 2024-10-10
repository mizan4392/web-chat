import { GroupMember } from 'src/group-members/entities/group-member.entity';
import { Group } from 'src/group/entities/group.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: true })
  imageUrl?: string;

  @OneToMany(() => Group, (group) => group.owner, { onDelete: 'CASCADE' })
  groups: Group[];

  @ManyToOne(() => GroupMember, (group) => group.user)
  groupMembers: GroupMember[];
}
