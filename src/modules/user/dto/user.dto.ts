import { Exclude, Expose } from 'class-transformer';
import { Task } from 'src/modules/task/task.entity';

@Exclude()
export class UserDto {
    
    @Expose()
    id: number;

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
    tasks: Task[];

    /* constructor(props) {
        Object.assign(this, props);
    } */
}
