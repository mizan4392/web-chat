import { Group } from 'src/group/entities/group.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
