import { UserEntity } from '../user.entity';

export class UserDto {
    
    id: number;

    username: string;

    firstName: string;

    lastName: string;

    phone: string;

    constructor(user: UserEntity) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.phone = user.phone;
    }
}
