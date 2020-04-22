import { Factory, Seeder } from "typeorm-seeding";
import { UserEntity } from "../../modules/user/user.entity";
import { Connection } from "typeorm";

export default class UserSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      await factory(UserEntity)().createMany(5);
    }
  }