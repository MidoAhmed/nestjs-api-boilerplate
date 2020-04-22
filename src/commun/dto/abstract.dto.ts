import { AbstractEntity } from '../abstract.entity';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class AbstractDto {

    @Expose()
    id: string;
    
    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
