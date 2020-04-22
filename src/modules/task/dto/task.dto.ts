import { Exclude, Expose, Type } from 'class-transformer';
import { AbstractDto } from '../../../commun/dto/abstract.dto';
import { TaskStatus } from '../task-status.enum';
import { UserDto } from '../../user/dto/user.dto';

@Exclude()
export class TaskDto extends AbstractDto{

    @Expose()
    title: string;

    @Expose()
    description: string;
  
    @Expose()
    status: TaskStatus;
  
    @Expose()
    userId: number;
    
    @Expose()
    @Type(() => UserDto)
    user: UserDto;
}
