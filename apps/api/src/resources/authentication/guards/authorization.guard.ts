import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { promisify } from 'util';
import { Request, Response } from 'express';
import {
  auth,
  InvalidTokenError,
  UnauthorizedError,
} from 'express-oauth2-jwt-bearer';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { IS_PUBLIC_ROUTE_KEY } from 'resources/authentication/decorators/is-public.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublicRoute) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const validateAccessToken = promisify(
      auth({
        audience: this.config.get<string>('AUTH0.AUDIENCE'),
        issuerBaseURL: this.config.get<string>('AUTH0.ISSUER_BASE_URL'),
        tokenSigningAlg: 'RS256',
      }),
    );

    try {
      await validateAccessToken(request, response);
      return true;
    } catch (error) {
      if (
        error instanceof UnauthorizedError ||
        error instanceof InvalidTokenError
      ) {
        throw new UnauthorizedException('Invalid authentication credentials');
      }

      throw new InternalServerErrorException();
    }
  }
}
