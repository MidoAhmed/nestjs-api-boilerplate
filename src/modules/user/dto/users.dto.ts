import { UserDto } from "./user.dto";

export class UsersDto {
  
    readonly data: UserDto[];

    constructor(data: UserDto[]) {
        this.data = data;
    }
}
