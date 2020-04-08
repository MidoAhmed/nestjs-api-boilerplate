import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'task' })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(type => UserEntity, user => user.tasks, { eager: false})
  user: UserEntity;

  @Column()
  userId: number;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
      type: 'timestamp without time zone',
      name: 'updated_at',
  })
  updatedAt: Date;
}
