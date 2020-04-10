import { Exclude, Expose } from 'class-transformer';
import { AbstractDto } from 'src/commun/dto/abstract.dto';
import { TaskStatus } from '../task-status.enum';

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
}
