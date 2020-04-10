import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '../user-role.enum';
import { AbstractDto } from '../../../commun/dto/abstract.dto';
import { TaskDto } from '../../task/dto/task.dto';

@Exclude()
export class UserDto extends AbstractDto{

    @Expose()
    username: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    phone: string;
    
    password: string;

    salt: string;

    @Expose()
    tasks: TaskDto[];

    @Expose()
    role: UserRole;
}
