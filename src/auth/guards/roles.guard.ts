import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  private allowedRoles: string[];

  constructor(...roles: string[]) {
    this.allowedRoles = roles;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !this.allowedRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied: Insufficient permissions for this resource.');
    }

    return true;
  }
}
