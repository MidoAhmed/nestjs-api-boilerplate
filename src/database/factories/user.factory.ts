import { UserEntity } from "../../modules/user/user.entity";
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import * as bcrypt from 'bcryptjs';
import { UserRole } from "src/modules/user/user-role.enum";


//The purpose of a factory is to create new fake entites with generate data.
//Factories can also be used to generate test data for some unit, integration or e2e tests.

define(UserEntity, (faker: typeof Faker) => {

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const user = new UserEntity();
    user.username = `${firstName}-${lastName}-${faker.random.number()}`;
    user.firstName = firstName;
    user.lastName = lastName;
    user.salt =  bcrypt.genSaltSync();
    user.password =  bcrypt.hashSync(faker.random.word(), user.salt);
    user.phone = faker.phone.phoneNumberFormat();
    user.tasks = [];
    user.role = faker.random.arrayElement([UserRole.ADMIN, UserRole.MANAGER, UserRole.GUEST, UserRole.GHOST]);

    return user;
  });