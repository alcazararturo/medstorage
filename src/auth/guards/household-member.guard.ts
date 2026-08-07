import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  HOUSEHOLD_ROLES_KEY,
  HouseholdRole,
} from '../decorators/household-roles.decorator';
import { HouseholdUsersService } from '../../household-users/household-users.service';

type AuthenticatedUser = {
  id: string;
};

type RequestWithUser = {
  user?: AuthenticatedUser;
  params: {
    householdId?: string;
  };
  householdMembership?: {
    id: string;
    householdId: string;
    userId: string;
    role: HouseholdRole;
  };
};

@Injectable()
export class HouseholdMemberGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly householdUsersService: HouseholdUsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    const householdId = request.params.householdId;

    if (!user) {
      throw new UnauthorizedException('Autenticación requerida');
    }

    if (!householdId) {
      throw new BadRequestException('El parámetro householdId es obligatorio');
    }

    const membership = await this.householdUsersService.findMembership(
      user.id,
      householdId,
    );

    if (!membership) {
      throw new ForbiddenException('No perteneces al hogar solicitado');
    }

    const requiredRoles = this.reflector.getAllAndOverride<HouseholdRole[]>(
      HOUSEHOLD_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (requiredRoles && !requiredRoles.includes(membership.role)) {
      throw new ForbiddenException(
        'No tienes permisos suficientes para esta operación',
      );
    }

    request.householdMembership = membership;

    return true;
  }
}
