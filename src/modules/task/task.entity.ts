import { BaseEntity, Entity, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { UserEntity } from '../user/user.entity';
import { AbstractEntity } from '../../commun/abstract.entity';

@Entity({ name: 'task' })
export class TaskEntity extends AbstractEntity{

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.OPEN
  })
  status: TaskStatus;

  @ManyToOne(type => UserEntity, user => user.tasks, { eager: false})
  user: UserEntity;

  @Column()
  userId: number;

}
