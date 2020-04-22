import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { TaskEntity } from "../../modules/task/task.entity";

export default class TaskSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      await factory(TaskEntity)().createMany(5);
    }
  }