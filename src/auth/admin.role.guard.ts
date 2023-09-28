import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/users/enums/user.enum';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  // constructor () {}
  canActivate(context: ExecutionContext) {
    const user = {
      name: 'owais',
      role: UserRoles.BUYER,
    };
    if (user.role === UserRoles.ADMIN) return true;
    else {
      return false;
    }
  }

}
