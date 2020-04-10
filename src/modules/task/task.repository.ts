import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { TaskDto } from './dto/task.dto';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  private logger = new Logger('TaskRepository');

  async getTasks(
    filterDto: GetTasksFilterDto,
    user: UserEntity,
  ): Promise<TaskDto[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    // query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskDto> {
    const { title, description } = createTaskDto;

    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    try {
      await this.save(task);
    } catch (error) {
      this.logger.error(`Failed to create a task for user "${user.username}". Data: ${createTaskDto}`, error.stack);
      throw new InternalServerErrorException();
    }

    delete task.user;
    return task;
  }
}
