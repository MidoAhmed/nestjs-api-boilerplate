import { Exclude, Expose } from 'class-transformer';

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

    /* constructor(props) {
        Object.assign(this, props);
    } */
}
