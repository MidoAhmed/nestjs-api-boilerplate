import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { TaskEntity } from '../../modules/task/task.entity';
import { TaskStatus } from '../../modules/task/task-status.enum';
import { UserEntity } from '../../modules/user/user.entity';

//The purpose of a factory is to create new fake entites with generate data.
//Factories can also be used to generate test data for some unit, integration or e2e tests.

define(TaskEntity, (faker: typeof Faker) => {
    
    const task = new TaskEntity();
    task.title = faker.random.word();
    task.description = faker.random.words();
    task.status = faker.random.arrayElement([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE]);
    task.user = factory(UserEntity)() as any;

    return task;
  });