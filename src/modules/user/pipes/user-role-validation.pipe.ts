import { PipeTransform, BadRequestException } from '@nestjs/common';
import { UserRole } from '../user-role.enum';

export class UserRoleValidationPipe implements PipeTransform {

  readonly allowedRoles = [
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.USER,
    UserRole.GHOST,
    UserRole.GUEST,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isRoleValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid role`);
    }

    return value;
  }

  private isRoleValid(role: any) {
    const idx = this.allowedRoles.indexOf(role);
    return idx !== -1;
  }
}
