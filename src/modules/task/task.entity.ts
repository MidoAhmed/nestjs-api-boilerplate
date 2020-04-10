import { BaseEntity, Entity, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { UserEntity } from '../user/user.entity';
import { AbstractEntity } from 'src/commun/abstract.entity';
import { TaskDto } from './dto/task.dto';

@Entity({ name: 'task' })
export class TaskEntity extends AbstractEntity{

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(type => UserEntity, user => user.tasks, { eager: false})
  user: UserEntity;

  @Column({nullable: true})
  userId: number;

}
