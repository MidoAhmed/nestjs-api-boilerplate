import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';
import { UserEntity } from '../user/user.entity';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {

  constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

  async getTasks(filterDto: GetTasksFilterDto, user: UserEntity): Promise<TaskDto[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: UserEntity): Promise<TaskDto> {
    const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<TaskDto> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: number, user: UserEntity): Promise<any> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return Promise.resolve({
      result: result,
      status: 'succes'
    });
  }

  async updateTaskStatus(id: number, status: TaskStatus, user: UserEntity): Promise<TaskDto> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
