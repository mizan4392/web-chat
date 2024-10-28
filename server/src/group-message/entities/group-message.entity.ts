import { Group } from 'src/group/entities/group.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GroupMessage {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'text', nullable: true })
  imageUrl?: string;

  @Column({ type: 'text', nullable: true })
  fileType?: string;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  user?: User;

  @ManyToOne(() => Group)
  group?: Group;

  @Column()
  groupId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;
}
